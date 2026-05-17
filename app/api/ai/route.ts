import { NextResponse } from "next/server";

type AiRequest = {
  mode?: "explain" | "fix" | "optimize" | "feature";
  log?: string;
  prompt?: string;
  filePath?: string;
  fileContent?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as AiRequest;

  if (!body.mode) {
    return NextResponse.json({ error: "Missing AI mode" }, { status: 400 });
  }

  const modelRouter = {
    explain: "gpt-4o",
    fix: "claude-sonnet",
    optimize: "gemini-3.1-pro",
    feature: "claude-sonnet"
  } as const;

  return NextResponse.json({
    model: modelRouter[body.mode],
    summary:
      "Demo response generated locally. Wire this route to OpenAI, Anthropic, or Gemini SDKs for live AI output.",
    patch: body.mode === "fix" ? "Add JSON content type, validate provider response, and avoid returning raw OAuth token data." : null,
    input: {
      filePath: body.filePath,
      prompt: body.prompt,
      logPreview: body.log?.slice(0, 240)
    }
  });
}
