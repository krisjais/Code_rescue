"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CodeRescueWorkspace } from "@/components/code-rescue-workspace";
import { repositories as fallbackRepositories, type Repo } from "@/lib/mock-data";
import { Loader2 } from "lucide-react";

export default function WorkspacePage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const repoId = typeof params?.repoId === "string" ? params.repoId : fallbackRepositories[0].id;

  const [repos, setRepos] = useState<Repo[]>(fallbackRepositories);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/github/repositories")
      .then((res) => res.json())
      .then((data: { repositories?: Repo[] }) => {
        if (data.repositories?.length) setRepos(data.repositories);
      })
      .catch(() => setRepos(fallbackRepositories));
  }, [status]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 bg-[#060914]">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin text-rescue-cyan" />
          Loading workspace...
        </div>
      </main>
    );
  }

  return (
    <CodeRescueWorkspace
      repositories={repos}
      initialRepoId={repoId}
      userName={session?.user?.name ?? session?.user?.email ?? "developer"}
      onBackToRepos={() => router.push("/")}
    />
  );
}
