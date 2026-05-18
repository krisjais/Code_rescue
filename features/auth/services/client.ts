export type AuthDiagnostics = {
  githubConfigured: boolean;
  nextAuthUrl: string;
  callbackUrl: string;
};

export async function fetchAuthDiagnostics() {
  const response = await fetch("/api/auth/diagnostics");
  if (!response.ok) throw new Error("Unable to load auth diagnostics");
  return (await response.json()) as AuthDiagnostics;
}
