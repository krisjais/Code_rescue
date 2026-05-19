import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/features/auth/services/options";
import { commitFileToGitHub } from "@/features/commits/services/server";
import type { CommitFileRequest } from "@/features/commits/types";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ repoId: string }> }) {
  const { repoId } = await params;
  const session = (await getServerSession(authOptions)) as Session | null;
  const accessToken = session?.githubAccessToken;

  if (!accessToken) {
    return NextResponse.json({ error: "GitHub session expired. Sign in again." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CommitFileRequest;
    return NextResponse.json(await commitFileToGitHub(accessToken, repoId, body));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to commit selected file" },
      { status: 400 }
    );
  }
}
