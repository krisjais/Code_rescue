"use client";

import { CheckCircle2, FileCode2, GitBranch, Rocket, Search, Sparkles } from "lucide-react";
import type { Repo, RepositorySource } from "@/features/github/types";

type RepositoryPickerProps = {
  repos: Repo[];
  source: RepositorySource;
  userName: string;
  isLoading?: boolean;
  error?: string | null;
  onChoose: (repoId: string) => void;
};

export function RepositoryPicker({
  repos,
  source,
  userName,
  isLoading,
  error,
  onChoose
}: RepositoryPickerProps) {
  return (
    <main className="min-h-screen px-4 py-5 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-rescue-green">
              <CheckCircle2 className="h-4 w-4" />
              Signed in as {userName}
            </div>
            <h1 className="text-3xl font-semibold text-white">Choose a repository to rescue</h1>
            <p className="mt-2 text-slate-400">
              {source === "github" ? "These are your GitHub repositories." : "Showing demo repositories until GitHub keys are configured."}
            </p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              className="focus-ring h-11 w-full rounded-lg border border-white/10 bg-black/20 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500"
              placeholder="Search repositories"
            />
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-lg border border-rescue-amber/30 bg-rescue-amber/10 p-4 text-sm text-rescue-amber">
            {error}
          </div>
        )}

        {isLoading ? (
          <RepositoryGridSkeleton />
        ) : repos.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center text-slate-400">
            No repositories found for this GitHub account.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {repos.map((repo) => (
              <button
                key={repo.id}
                onClick={() => onChoose(repo.id)}
                className="focus-ring group rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-rescue-cyan/40 hover:bg-rescue-cyan/10"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/25 text-rescue-cyan">
                    <FileCode2 className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400">{repo.branch}</span>
                </div>
                <h2 className="text-lg font-semibold text-white">{repo.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{repo.owner}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 text-slate-400">
                    <GitBranch className="h-4 w-4" />
                    {repo.updated}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-rescue-cyan">
                    Open
                    <Rocket className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-lg border border-rescue-cyan/20 bg-rescue-cyan/[0.06] p-4 text-sm text-slate-300">
          <Sparkles className="mr-2 inline h-4 w-4 text-rescue-cyan" />
          After choosing a repo, CodeRescue opens the editor and AI assistant for that repository.
        </div>
      </div>
    </main>
  );
}

function RepositoryGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-44 animate-pulse rounded-xl border border-white/10 bg-white/[0.04]" />
      ))}
    </div>
  );
}
