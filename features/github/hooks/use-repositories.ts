"use client";

import { useEffect, useState } from "react";
import { fetchRepositories } from "@/features/github/services/client";
import type { Repo, RepositorySource } from "@/features/github/types";
import { repositories as fallbackRepositories } from "@/lib/mock-data";

export function useRepositories(enabled: boolean) {
  const [repositories, setRepositories] = useState<Repo[]>(fallbackRepositories);
  const [source, setSource] = useState<RepositorySource>("mock");
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchRepositories()
      .then((data) => {
        if (controller.signal.aborted) return;
        setRepositories(data.repositories.length ? data.repositories : fallbackRepositories);
        setSource(data.source);
      })
      .catch((nextError: Error) => {
        if (controller.signal.aborted) return;
        setRepositories(fallbackRepositories);
        setSource("mock");
        setError(nextError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [enabled]);

  return { repositories, source, isLoading, error };
}

export function useWorkspaceRepository(repoId: string, enabled: boolean) {
  const { repositories, source, isLoading, error } = useRepositories(enabled);
  const [workspaceRepositories, setWorkspaceRepositories] = useState<Repo[]>(repositories);
  const [isLoadingFiles, setIsLoadingFiles] = useState(enabled);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => setWorkspaceRepositories(repositories), [repositories]);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    setIsLoadingFiles(true);
    setFileError(null);

    import("@/features/github/services/client")
      .then(({ fetchRepository }) => fetchRepository(repoId))
      .then((repository) => {
        if (controller.signal.aborted) return;
        setWorkspaceRepositories((current) => [
          repository,
          ...current.filter((repo) => repo.id !== repository.id)
        ]);
      })
      .catch((nextError: Error) => {
        if (!controller.signal.aborted) setFileError(nextError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoadingFiles(false);
      });

    return () => controller.abort();
  }, [enabled, repoId]);

  return {
    repositories: workspaceRepositories,
    source,
    isLoading: isLoading || isLoadingFiles,
    error: fileError ?? error
  };
}
