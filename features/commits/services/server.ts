import { Buffer } from "node:buffer";
import type { CommitFileRequest, CommitFileResponse } from "@/features/commits/types";
import { fetchGitHubRepos, githubHeaders } from "@/features/github/services/server";

type GitHubContentFile = {
  sha?: string;
  type?: string;
};

type GitHubCommitResponse = {
  commit?: {
    sha?: string;
    html_url?: string;
  };
  content?: {
    path?: string;
  };
};

export async function commitFileToGitHub(
  accessToken: string,
  repoId: string,
  input: CommitFileRequest
): Promise<CommitFileResponse> {
  validateCommitInput(input);

  const repos = await fetchGitHubRepos(accessToken);
  const repo = repos.find((item) => String(item.id) === repoId);

  if (!repo) {
    throw new Error("Repository not found for this GitHub account");
  }

  const owner = repo.owner.login;
  const repoName = repo.name;
  const branch = input.branch || repo.default_branch;
  const encodedPath = input.filePath.split("/").map(encodeURIComponent).join("/");

  const currentFileResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`,
    {
      headers: githubHeaders(accessToken),
      cache: "no-store"
    }
  );

  if (!currentFileResponse.ok) {
    throw new Error(`Unable to read ${input.filePath} from ${branch}`);
  }

  const currentFile = (await currentFileResponse.json()) as GitHubContentFile | GitHubContentFile[];

  if (Array.isArray(currentFile) || currentFile.type !== "file" || !currentFile.sha) {
    throw new Error("Selected path is not a commit-ready file");
  }

  const updateResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/contents/${encodedPath}`,
    {
      method: "PUT",
      headers: githubHeaders(accessToken),
      body: JSON.stringify({
        message: input.message,
        content: Buffer.from(input.content, "utf8").toString("base64"),
        sha: currentFile.sha,
        branch
      })
    }
  );

  const updatePayload = (await updateResponse.json()) as GitHubCommitResponse & { message?: string };

  if (!updateResponse.ok) {
    throw new Error(updatePayload.message ?? "GitHub rejected the commit");
  }

  return {
    commitSha: updatePayload.commit?.sha ?? "",
    commitUrl: updatePayload.commit?.html_url ?? "",
    path: updatePayload.content?.path ?? input.filePath,
    branch
  };
}

function validateCommitInput(input: CommitFileRequest) {
  if (!input.filePath) throw new Error("Missing file path");
  if (!input.message) throw new Error("Missing commit message");
  if (typeof input.content !== "string") throw new Error("Missing file content");
}
