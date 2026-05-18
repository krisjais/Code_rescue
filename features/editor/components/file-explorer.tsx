"use client";

import { ChevronRight, CircleDot, FileCode2, GitBranch, PanelLeft } from "lucide-react";
import { useWorkspace } from "@/features/editor/context/workspace-context";
import { cn } from "@/lib/utils";

export function FileExplorer() {
  const { selectedRepo, selectedFile, selectFile } = useWorkspace();

  return (
    <aside className="glass flex min-h-[420px] flex-col border-r border-white/10 lg:min-h-0">
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <PanelLeft className="h-4 w-4 text-rescue-cyan" />
            Explorer
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <GitBranch className="h-3.5 w-3.5" />
            {selectedRepo.branch}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {selectedRepo.name}
        </div>
        <div className="space-y-1">
          {selectedRepo.files.map((file) => (
            <button
              key={file.id}
              onClick={() => selectFile(file)}
              className={cn(
                "focus-ring flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition",
                selectedFile.id === file.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/[0.05]"
              )}
            >
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 shrink-0 transition-transform",
                  selectedFile.id === file.id ? "rotate-90 text-white" : "text-slate-600"
                )}
              />
              <FileCode2 className="h-4 w-4 shrink-0 text-rescue-cyan" />
              <span className="truncate">{file.path}</span>
              {file.dirty && <CircleDot className="ml-auto h-3 w-3 shrink-0 text-rescue-pink" />}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
