import type { AssistantMode } from "@/features/ai/types";

export type AiRequest = {
  mode?: AssistantMode;
  log?: string;
  prompt?: string;
  filePath?: string;
  fileContent?: string;
  model?: string;
};

async function queryGemini(model: string, systemPrompt: string, userPrompt: string): Promise<any> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is missing. Please set GOOGLE_GENERATIVE_AI_API_KEY in your environment variables.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nUser Prompt:\n${userPrompt}` }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API call failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  return JSON.parse(text);
}

async function queryGroq(model: string, systemPrompt: string, userPrompt: string): Promise<any> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Groq API key is missing. Please set GROQ_API_KEY in your environment variables.");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API call failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("Empty response from Groq");
  }

  return JSON.parse(text);
}

export async function createAiWorkflowResponse(body: AiRequest) {
  if (!body.mode) {
    throw new Error("Missing AI mode");
  }

  const selectedModel = body.model ?? "gemini-2.5-flash";
  const systemPrompt = `You are an AI assistant inside CodeRescue AI, an emergency coding editor.
Your task is to analyze the file and logs, then help the user with the action mode: "${body.mode}".
You MUST return a JSON object with the following schema:
{
  "summary": "A markdown string explaining your reasoning, analysis, explanation, or feature implementation plan.",
  "patch": "A string containing the COMPLETE updated code of the file. If no code changes are needed (e.g. mode is 'explain'), return null. You MUST return the full code structure, not a diff."
}
Ensure the "patch" is valid syntax for the file type, and contains all your edits. Output ONLY valid JSON.`;

  const userPrompt = `Mode: ${body.mode}
File Path: ${body.filePath ?? "unknown"}
Current Code Content:
\`\`\`
${body.fileContent ?? ""}
\`\`\`

User Request/Problem: ${body.prompt ?? "None"}
${body.log ? `Deployment logs:\n${body.log}` : ""}
`;

  let result;
  if (selectedModel.startsWith("gemini-")) {
    result = await queryGemini(selectedModel, systemPrompt, userPrompt);
  } else {
    result = await queryGroq(selectedModel, systemPrompt, userPrompt);
  }

  return {
    model: selectedModel,
    summary: result.summary ?? "AI completed the analysis.",
    patch: result.patch ?? null,
    input: {
      filePath: body.filePath,
      prompt: body.prompt,
      logPreview: body.log?.slice(0, 240)
    }
  };
}

