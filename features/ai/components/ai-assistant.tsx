"use client";

import { Bot, BrainCircuit, Loader2, Send, Sparkles, Wand2, Zap } from "lucide-react";
import { aiResponses } from "@/features/ai/lib/demo-ai";
import { parseDeploymentLog } from "@/features/ai/lib/log-parser";
import { ActionButton } from "@/features/ai/components/action-button";
import { DiffViewer } from "@/features/ai/components/diff-viewer";
import { CommitPreview } from "@/features/commits/components/commit-preview";
import { useWorkspace } from "@/features/editor/context/workspace-context";

export function AiAssistant() {
  const {
    logText,
    setLogText,
    prompt,
    setPrompt,
    assistantMode,
    isGenerating,
    runAssistant
  } = useWorkspace();
  const parsedLog = parseDeploymentLog(logText);

  return (
    <aside className="glass flex min-h-[620px] flex-col border-l border-white/10 lg:min-h-0">
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Bot className="h-4 w-4 text-rescue-pink" />
              AI rescue assistant
            </div>
            <p className="text-xs text-slate-500">Claude, GPT-4o, and Gemini ready</p>
          </div>
          <span className="rounded-full border border-rescue-pink/30 bg-rescue-pink/10 px-2.5 py-1 text-xs text-rescue-pink">
            {parsedLog.framework}
          </span>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto p-4">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Deployment logs
            </label>
            <span className="text-xs text-slate-500">{parsedLog.severity}</span>
          </div>
          <textarea
            value={logText}
            onChange={(event) => setLogText(event.target.value)}
            className="focus-ring h-36 w-full resize-none rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs leading-5 text-slate-300"
          />
        </section>

        <div className="grid grid-cols-2 gap-2">
          <ActionButton icon={BrainCircuit} label="Explain Error" onClick={() => runAssistant("explain")} />
          <ActionButton icon={Wand2} label="Fix with AI" hot onClick={() => runAssistant("fix")} />
          <ActionButton icon={Zap} label="Optimize Code" onClick={() => runAssistant("optimize")} />
          <ActionButton icon={Sparkles} label="Add Feature" onClick={() => runAssistant("feature")} />
        </div>

        <section className="rounded-lg border border-rescue-cyan/20 bg-rescue-cyan/[0.06] p-4 animate-pulseBorder">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin text-rescue-cyan" />
            ) : (
              <Sparkles className="h-4 w-4 text-rescue-cyan" />
            )}
            Analysis
          </div>
          <p className="text-sm leading-6 text-slate-300">{aiResponses[assistantMode]}</p>
        </section>

        <DiffViewer />

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Feature prompt
          </label>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="focus-ring h-24 w-full resize-none rounded-lg border border-white/10 bg-black/30 p-3 text-sm leading-5 text-slate-300"
          />
          <button
            onClick={() => runAssistant("feature")}
            className="focus-ring mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-slate-950 transition hover:bg-rescue-green"
          >
            <Send className="h-4 w-4" />
            Generate change
          </button>
        </section>

        <CommitPreview />
      </div>
    </aside>
  );
}
