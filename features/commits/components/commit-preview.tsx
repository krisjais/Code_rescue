"use client";

import { LockKeyhole } from "lucide-react";
import { useWorkspace } from "@/features/editor/context/workspace-context";

export function CommitPreview() {
  const { commitMessage } = useWorkspace();

  return (
    <section className="rounded-lg border border-white/10 bg-black/20 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
        <LockKeyhole className="h-4 w-4 text-rescue-amber" />
        Commit plan
      </div>
      <p className="rounded-lg border border-white/10 bg-white/[0.04] p-3 font-mono text-xs text-slate-300">
        {commitMessage}
      </p>
    </section>
  );
}
