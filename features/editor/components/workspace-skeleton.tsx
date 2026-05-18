import { Loader2 } from "lucide-react";

export function WorkspaceSkeleton({ label = "Loading repository files..." }: { label?: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#060914] px-4">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-slate-300">
        <Loader2 className="h-5 w-5 animate-spin text-rescue-cyan" />
        {label}
      </div>
    </main>
  );
}
