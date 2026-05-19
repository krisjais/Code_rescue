import type { CommitFileRequest, CommitFileResponse } from "@/features/commits/types";

export async function commitFile(repoId: string, input: CommitFileRequest) {
  const response = await fetch(`/api/github/repositories/${repoId}/commit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  const data = (await response.json()) as CommitFileResponse | { error?: string };

  if (!response.ok) {
    throw new Error("error" in data && data.error ? data.error : "Unable to commit file");
  }

  return data as CommitFileResponse;
}
