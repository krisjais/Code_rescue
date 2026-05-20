"use client";

import { Activity, Check, Code2, Diff, FileCode2, Laptop, Save } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MonacoPane } from "@/features/editor/components/monaco-pane";
import { useWorkspace } from "@/features/editor/context/workspace-context";
import { cn } from "@/lib/utils";

const editorStats: Array<[string, string, LucideIcon]> = [
  ["AI patch applied", "Ready for review", Check],
  ["Framework", "Next.js detected", Laptop],
  ["Provider", "Vercel log parser", Activity]
];

export function EditorPanel() {
  const {
    selectedFile,
    openTabs,
    fileContent,
    setFileContent,
    selectFile,
    diffMode,
    setDiffMode,
    saveFile,
    originalContent,
    applied
  } = useWorkspace();


  return (
    <section className="flex min-h-[680px] min-w-0 flex-col bg-[#070b14] lg:min-h-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Code2 className="h-4 w-4 text-rescue-green" />
            Browser code editor
          </div>
          <p className="truncate text-xs text-slate-500">{selectedFile.path}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={saveFile}
            className="focus-ring inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-300 hover:bg-white/[0.08]"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={() => setDiffMode(!diffMode)}
            className={cn(
              "focus-ring inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm transition",
              diffMode
                ? "border-rescue-green bg-rescue-green/20 text-rescue-green hover:bg-rescue-green/30"
                : "border-rescue-green/30 bg-rescue-green/10 text-rescue-green hover:bg-rescue-green/15"
            )}
          >
            <Diff className="h-4 w-4" />
            Diff preview
          </button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-white/10 bg-black/20 px-3 pt-2">
        {openTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => selectFile(tab)}
            className={cn(
              "focus-ring flex h-10 min-w-0 items-center gap-2 rounded-t-lg border border-b-0 px-3 text-sm",
              selectedFile.id === tab.id
                ? "border-white/10 bg-[#070b14] text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            )}
          >
            <FileCode2 className="h-4 w-4 shrink-0" />
            <span className="truncate">{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0">
          <MonacoPane
            language={selectedFile.language}
            value={fileContent}
            onChange={setFileContent}
            diffMode={diffMode}
            originalValue={originalContent}
          />
        </div>
      </div>


      <div className="grid border-t border-white/10 bg-black/20 md:grid-cols-3">
        {editorStats.map(([label, value, Icon]) => (
          <div key={label} className="flex items-center gap-3 border-white/10 p-3 md:border-r">
            <Icon className="h-4 w-4 text-rescue-cyan" />
            <div>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-sm text-slate-200">
                {label === "AI patch applied" && !applied ? "Waiting for action" : value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
