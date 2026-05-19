import { Buffer } from "node:buffer";
import type { Repo, RepoFile } from "@/features/github/types";
import {
  createRepoEmptyStateFile,
  createRepoPreviewFiles,
  isReadableCodePath,
  languageFromPath,
  sortCodePaths
} from "@/lib/repo-utils";

type GitHubRepo = {
  id: number;
  name: string;
  owner: { login: string };
  default_branch: string;
  updated_at: string;
};

type GitTreeItem = {
  path?: string;
  type?: "blob" | "tree" | "commit";
  sha?: string;
  size?: number;
};

type GitBlob = {
  content?: string;
  encoding?: string;
};

export function githubHeaders(accessToken: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${accessToken}`,
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

function relativeUpdatedAt(updatedAt: string) {
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    Math.max(-30, Math.round((new Date(updatedAt).getTime() - Date.now()) / 86400000)),
    "day"
  );
}

function toRepo(repo: GitHubRepo, files: RepoFile[], status: Repo["status"] = "healthy"): Repo {
  return {
    id: String(repo.id),
    name: repo.name,
    owner: repo.owner.login,
    branch: repo.default_branch,
    status,
    updated: relativeUpdatedAt(repo.updated_at),
    files
  };
}

export async function fetchGitHubRepos(accessToken: string) {
  const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
    headers: githubHeaders(accessToken),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`GitHub repositories request failed with ${response.status}`);
  }

  return (await response.json()) as GitHubRepo[];
}

export async function fetchGitHubRepoPreviews(accessToken: string): Promise<Repo[]> {
  const repos = await fetchGitHubRepos(accessToken);

  return repos.map((repo, index) =>
    toRepo(
      repo,
      createRepoPreviewFiles(repo.name, repo.default_branch),
      index % 5 === 0 ? "review" : "healthy"
    )
  );
}

export async function fetchGitHubRepoDetail(accessToken: string, repoId: string): Promise<Repo> {
  const repos = await fetchGitHubRepos(accessToken);
  const repo = repos.find((item) => String(item.id) === repoId);

  if (!repo) {
    throw new Error("Repository not found");
  }

  const treeResponse = await fetch(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`,
    {
      headers: githubHeaders(accessToken),
      cache: "no-store"
    }
  );

  if (!treeResponse.ok) {
    return toRepo(repo, createRepoPreviewFiles(repo.name, repo.default_branch), "review");
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
      if (!item.path || !item.sha) return null;

      const blobResponse = await fetch(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/blobs/${item.sha}`,
        {
          headers: githubHeaders(accessToken),
          cache: "no-store"
        }
      );

      if (!blobResponse.ok) return null;

      const blob = (await blobResponse.json()) as GitBlob;
      if (blob.encoding !== "base64" || !blob.content) return null;

      return {
        id: `${repo.id}-${item.path}`,
        name: item.path.split("/").pop() ?? item.path,
        path: item.path,
        language: languageFromPath(item.path),
        content: Buffer.from(blob.content.replace(/\s/g, ""), "base64").toString("utf8")
      };
    })
  );

  const readableFiles = files.filter((file): file is RepoFile => Boolean(file));
  return toRepo(repo, readableFiles.length ? readableFiles : [createRepoEmptyStateFile(repo.name)]);
}
