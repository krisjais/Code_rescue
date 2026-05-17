import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { repositories } from "@/lib/mock-data";
import { createRepoPreviewFiles } from "@/lib/repo-utils";

export async function GET() {
  const session = (await getServerSession(authOptions)) as Session | null;
  const accessToken = session?.githubAccessToken;

  if (accessToken) {
    const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=20", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28"
      },
      next: {
        revalidate: 60
      }
    });

    if (response.ok) {
      const githubRepos = (await response.json()) as Array<{
        id: number;
        name: string;
        owner: { login: string };
        default_branch: string;
        updated_at: string;
      }>;

      return NextResponse.json({
        repositories: githubRepos.map((repo, index) => ({
          id: String(repo.id),
          name: repo.name,
          owner: repo.owner.login,
          branch: repo.default_branch,
          status: index % 5 === 0 ? "review" : "healthy",
          updated: new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
            Math.max(-30, Math.round((new Date(repo.updated_at).getTime() - Date.now()) / 86400000)),
            "day"
          ),
          files: createRepoPreviewFiles(repo.name, repo.default_branch)
        })),
        source: "github"
      });
    }
  }

  return NextResponse.json({
    repositories,
    source: "mock",
    nextStep: "Replace with Octokit using the GitHub access token from NextAuth."
  });
}
