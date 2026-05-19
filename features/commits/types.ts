export type CommitFileRequest = {
  branch: string;
  filePath: string;
  content: string;
  message: string;
};

export type CommitFileResponse = {
  commitSha: string;
  commitUrl: string;
  path: string;
  branch: string;
};
