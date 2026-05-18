"use client";

import { AiAssistant } from "@/features/ai/components/ai-assistant";
import { EditorPanel } from "@/features/editor/components/editor-panel";
import { FileExplorer } from "@/features/editor/components/file-explorer";
import { WorkspaceHeader } from "@/features/editor/components/workspace-header";
import { WorkspaceProvider, useWorkspace } from "@/features/editor/context/workspace-context";
import { Toast } from "@/features/diagnostics/components/toast";
import type { Repo } from "@/features/github/types";

type CodeRescueWorkspaceProps = {
  repositories?: Repo[];
  initialRepoId?: string;
  userName?: string;
  onBackToRepos?: () => void;
};

export function CodeRescueWorkspace(props: CodeRescueWorkspaceProps) {
  return (
    <WorkspaceProvider repositories={props.repositories} initialRepoId={props.initialRepoId}>
      <WorkspaceLayout userName={props.userName ?? "developer"} onBackToRepos={props.onBackToRepos} />
    </WorkspaceProvider>
  );
}

function WorkspaceLayout({
  userName,
  onBackToRepos
}: {
  userName: string;
  onBackToRepos?: () => void;
}) {
  const { toast } = useWorkspace();

  return (
    <main className="min-h-screen px-3 py-3 text-slate-100 md:px-5 md:py-5">
      <Toast message={toast} />
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-[1800px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#060914]/86 shadow-card backdrop-blur-2xl">
        <WorkspaceHeader userName={userName} onBackToRepos={onBackToRepos} />
        <section className="grid flex-1 grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_380px]">
          <FileExplorer />
          <EditorPanel />
          <AiAssistant />
        </section>
      </div>
    </main>
  );
}
