"use client";

import { Github, LogOut, PanelLeft, Rocket, ShieldAlert } from "lucide-react";
import { signOut } from "next-auth/react";
import { useWorkspace } from "@/features/editor/context/workspace-context";

type WorkspaceHeaderProps = {
  userName: string;
  onBackToRepos?: () => void;
};

export function WorkspaceHeader({ userName, onBackToRepos }: WorkspaceHeaderProps) {
  const { commitChanges } = useWorkspace();

  return (
    <header className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rescue-cyan/30 bg-rescue-cyan/10 shadow-glow">
          <ShieldAlert className="h-5 w-5 text-rescue-cyan" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-normal text-white">CodeRescue AI</h1>
            <span className="rounded-full border border-rescue-green/30 bg-rescue-green/10 px-2.5 py-1 text-xs font-medium text-rescue-green">
              Emergency workspace
            </span>
          </div>
          <p className="text-sm text-slate-400">Fix, edit, and deploy code from anywhere using AI.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-200 transition hover:bg-white/[0.08]">
          <Github className="h-4 w-4" />
          Connected as {userName}
        </button>
        {onBackToRepos && (
          <button
            onClick={onBackToRepos}
            className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-200 transition hover:bg-white/[0.08]"
          >
            <PanelLeft className="h-4 w-4" />
            Repos
          </button>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-200 transition hover:bg-white/[0.08]"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
        <button 
          onClick={commitChanges}
          className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg bg-rescue-cyan px-3 text-sm font-semibold text-slate-950 transition hover:bg-rescue-green"
        >
          <Rocket className="h-4 w-4" />
          Commit and push
        </button>
      </div>
    </header>
  );
}
