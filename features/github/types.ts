export type RepoFile = {
  id: string;
  name: string;
  path: string;
  language: string;
  dirty?: boolean;
  content: string;
};

export type Repo = {
  id: string;
  name: string;
  owner: string;
  branch: string;
  status: "healthy" | "failing" | "review";
  updated: string;
  files: RepoFile[];
};

export type RepositorySource = "mock" | "github";
