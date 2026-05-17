import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Repo, RepoFile } from "@/lib/mock-data";
import { repositories } from "@/lib/mock-data";
import {
  createRepoEmptyStateFile,
  createRepoPreviewFiles,
  isReadableCodePath,
  languageFromPath,
  sortCodePaths
} from "@/lib/repo-utils";

export const runtime = "nodejs";

type GitHubRepo = {
  id: number;
  name: string;
  owner: { login: string };
  default_branch: string;
  updated_at: string;
};

type GitTreeItem = {
  path?: string;
  mode?: string;
  type?: "blob" | "tree" | "commit";
  sha?: string;
  size?: number;
};

type GitBlob = {
  content?: string;
  encoding?: string;
  size?: number;
};

export async function GET(_request: Request, { params }: { params: Promise<{ repoId: string }> }) {
  const { repoId } = await params;
  const session = (await getServerSession(authOptions)) as Session | null;
  const accessToken = session?.githubAccessToken;

  if (!accessToken) {
    const fallback = repositories.find((repo) => repo.id === repoId) ?? repositories[0];
    return NextResponse.json({ repository: fallback, source: "mock" });
  }

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${accessToken}`,
    "X-GitHub-Api-Version": "2022-11-28"
  };

  const reposResponse = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
    headers,
    cache: "no-store"
  });

  if (!reposResponse.ok) {
    return NextResponse.json({ error: "Unable to load GitHub repositories" }, { status: reposResponse.status });
  }

  const repos = (await reposResponse.json()) as GitHubRepo[];
  const repo = repos.find((item) => String(item.id) === repoId);

  if (!repo) {
    return NextResponse.json({ error: "Repository not found" }, { status: 404 });
  }

  const treeResponse = await fetch(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`,
    {
      headers,
      cache: "no-store"
    }
  );

  if (!treeResponse.ok) {
    return NextResponse.json({
      repository: toRepo(repo, createRepoPreviewFiles(repo.name, repo.default_branch)),
      source: "github",
      warning: "Unable to load repository tree"
    });
  }

  const treePayload = (await treeResponse.json()) as { tree?: GitTreeItem[] };
  const candidates = (treePayload.tree ?? [])
    .filter((item) => item.type === "blob" && item.path && item.sha)
    .filter((item) => isReadableCodePath(item.path ?? ""))
    .filter((item) => (item.size ?? 0) > 0 && (item.size ?? 0) <= 90000)
    .sort((a, b) => sortCodePaths(a.path ?? "", b.path ?? ""))
    .slice(0, 12);

  const files = await Promise.all(
    candidates.map(async (item): Promise<RepoFile | null> => {
      const path = item.path;
      const sha = item.sha;
      if (!path || !sha) return null;

      const blobResponse = await fetch(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/blobs/${sha}`,
        {
          headers,
          cache: "no-store"
        }
      );

      if (!blobResponse.ok) return null;

      const blob = (await blobResponse.json()) as GitBlob;
      if (blob.encoding !== "base64" || !blob.content) return null;

      return {
        id: `${repo.id}-${path}`,
        name: path.split("/").pop() ?? path,
        path,
        language: languageFromPath(path),
        content: Buffer.from(blob.content.replace(/\s/g, ""), "base64").toString("utf8")
      };
    })
  );

  const readableFiles = files.filter((file): file is RepoFile => Boolean(file));

  return NextResponse.json({
    repository: toRepo(repo, readableFiles.length > 0 ? readableFiles : [createRepoEmptyStateFile(repo.name)]),
    source: "github"
  });
}

function toRepo(repo: GitHubRepo, files: RepoFile[]): Repo {
  return {
    id: String(repo.id),
    name: repo.name,
    owner: repo.owner.login,
    branch: repo.default_branch,
    status: "healthy",
    updated: new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.max(-30, Math.round((new Date(repo.updated_at).getTime() - Date.now()) / 86400000)),
      "day"
    ),
    files
  };
}
