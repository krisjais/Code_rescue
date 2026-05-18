import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/features/auth/services/options";
import { repositories } from "@/lib/mock-data";
import { fetchGitHubRepoDetail } from "@/features/github/services/server";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ repoId: string }> }) {
  const { repoId } = await params;
  const session = (await getServerSession(authOptions)) as Session | null;
  const accessToken = session?.githubAccessToken;

  if (!accessToken) {
    const fallback = repositories.find((repo) => repo.id === repoId) ?? repositories[0];
    return NextResponse.json({ repository: fallback, source: "mock" });
  }

  try {
    return NextResponse.json({
      repository: await fetchGitHubRepoDetail(accessToken, repoId),
      source: "github"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load repository files" },
      { status: 404 }
    );
  }
}
