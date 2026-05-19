import type { Repo, RepositorySource } from "@/features/github/types";

type RepositoriesResponse = {
  repositories?: Repo[];
  source?: RepositorySource;
  error?: string;
};

type RepositoryResponse = {
  repository?: Repo;
  source?: RepositorySource;
  error?: string;
};

export async function fetchRepositories() {
  const response = await fetch("/api/github/repositories");
  const data = (await response.json()) as RepositoriesResponse;

  if (!response.ok || data.error) {
    throw new Error(data.error ?? "Unable to load repositories");
  }

  return {
    repositories: data.repositories ?? [],
    source: data.source ?? "mock"
  };
}

export async function fetchRepository(repoId: string) {
  const response = await fetch(`/api/github/repositories/${repoId}`);
  const data = (await response.json()) as RepositoryResponse;

  if (!response.ok || !data.repository) {
    throw new Error(data.error ?? "Unable to load repository files");
  }

  return data.repository;
}
