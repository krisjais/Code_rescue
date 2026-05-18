import type { AssistantMode } from "@/features/ai/types";

export async function requestAiWorkflow(input: {
  mode: AssistantMode;
  log: string;
  prompt: string;
  filePath: string;
  fileContent: string;
}) {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    throw new Error("AI request failed");
  }

  return response.json() as Promise<{ summary: string; patch: string | null; model: string }>;
}
