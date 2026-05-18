"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { CodeRescueWorkspace } from "@/features/editor/components/code-rescue-workspace";
import { WorkspaceSkeleton } from "@/features/editor/components/workspace-skeleton";
import { useWorkspaceRepository } from "@/features/github/hooks/use-repositories";
import { repositories as fallbackRepositories } from "@/lib/mock-data";

export default function WorkspacePage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const repoId = typeof params?.repoId === "string" ? params.repoId : fallbackRepositories[0].id;
  const { repositories, isLoading } = useWorkspaceRepository(repoId, status === "authenticated");

  if (status === "loading" || isLoading) return <WorkspaceSkeleton />;

  return (
    <CodeRescueWorkspace
      repositories={repositories}
      initialRepoId={repoId}
      userName={session?.user?.name ?? session?.user?.email ?? "developer"}
      onBackToRepos={() => router.push("/")}
    />
  );
}
