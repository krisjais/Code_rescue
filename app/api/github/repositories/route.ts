import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/features/auth/services/options";
import { repositories } from "@/lib/mock-data";
import { fetchGitHubRepoPreviews } from "@/features/github/services/server";

export async function GET() {
  const session = (await getServerSession(authOptions)) as Session | null;
  const accessToken = session?.githubAccessToken;

  if (accessToken) {
    try {
      return NextResponse.json({
        repositories: await fetchGitHubRepoPreviews(accessToken),
        source: "github"
      });
    } catch (error) {
      return NextResponse.json(
        { repositories, source: "mock", error: error instanceof Error ? error.message : "GitHub request failed" },
        { status: 200 }
      );
    }
  }

  return NextResponse.json({
    repositories,
    source: "mock",
    nextStep: "Replace with Octokit using the GitHub access token from NextAuth."
  });
}
