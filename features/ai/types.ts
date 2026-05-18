export type AssistantMode = "explain" | "fix" | "optimize" | "feature";

export type AiDiffLine = {
  id: string;
  tone: "add" | "remove";
  text: string;
};
