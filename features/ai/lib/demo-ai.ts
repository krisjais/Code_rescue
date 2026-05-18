import type { AiDiffLine, AssistantMode } from "@/features/ai/types";

export const aiResponses: Record<AssistantMode, string> = {
  explain:
    "The selected error points to a request/response handling problem. I checked the selected file, the pasted logs, and the likely framework boundary before suggesting a fix.",
  fix:
    "I generated a safe patch for the selected file. Review the diff, then commit it with the generated message.",
  optimize:
    "Optimization path: isolate provider calls, lazy-load expensive editor bundles, and keep GitHub file content loading scoped to the selected repository.",
  feature:
    "Feature plan generated. I would apply the change to the selected file first, then update related UI and commit it as a focused patch."
};

export const demoFixedCode = `import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: "GitHub token exchange failed" },
      { status: tokenResponse.status }
    );
  }

  const token = await tokenResponse.json();

  return NextResponse.json({
    connected: true,
    scope: token.scope,
    tokenType: token.token_type
  });
}
`;

export const demoDiff: AiDiffLine[] = [
  { id: "content-type", tone: "add", text: '+ "Content-Type": "application/json"' },
  { id: "safe-error", tone: "add", text: "+ if (!tokenResponse.ok) return safe error" },
  { id: "raw-token", tone: "remove", text: "- return raw token payload to browser" }
];

export function generateCommitMessage(filePath: string) {
  const area = filePath.split("/").slice(-2, -1)[0] ?? "code";
  return `fix(${area}): apply AI rescue patch`;
}
