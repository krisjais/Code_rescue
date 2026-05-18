export type ParsedLog = {
  title: string;
  framework: string;
  severity: "error" | "warning" | "info";
};

export function parseDeploymentLog(log: string): ParsedLog {
  const lower = log.toLowerCase();

  return {
    title: log.split("\n").find(Boolean) ?? "No deployment log pasted",
    framework: lower.includes("vercel") || lower.includes("next") ? "Next.js" : "Unknown",
    severity: lower.includes("error") || lower.includes("failed") ? "error" : "info"
  };
}
