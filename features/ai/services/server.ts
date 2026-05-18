import type { AssistantMode } from "@/features/ai/types";

export type AiRequest = {
  mode?: AssistantMode;
  log?: string;
  prompt?: string;
  filePath?: string;
  fileContent?: string;
};

const modelRouter: Record<AssistantMode, string> = {
  explain: "gpt-4o",
  fix: "claude-sonnet",
  optimize: "gemini-3.1-pro",
  feature: "claude-sonnet"
};

export function createAiWorkflowResponse(body: AiRequest) {
  if (!body.mode) {
    throw new Error("Missing AI mode");
  }

  return {
    model: modelRouter[body.mode],
    summary:
      "Demo response generated locally. Wire this service to OpenAI, Anthropic, Groq, or Gemini SDKs for live AI output.",
    patch: body.mode === "fix" ? "Add JSON content type, validate provider response, and avoid returning raw OAuth token data." : null,
    input: {
      filePath: body.filePath,
      prompt: body.prompt,
      logPreview: body.log?.slice(0, 240)
    }
  };
}
