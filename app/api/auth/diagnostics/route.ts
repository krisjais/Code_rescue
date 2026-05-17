import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    githubConfigured: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    nextAuthUrl: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    callbackUrl: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/auth/callback/github`
  });
}
