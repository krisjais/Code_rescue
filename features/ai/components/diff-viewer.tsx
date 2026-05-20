import { useWorkspace } from "@/features/editor/context/workspace-context";
import { cn } from "@/lib/utils";

export function DiffViewer() {
  const { diffLines } = useWorkspace();
  const additions = diffLines.filter((l) => l.tone === "add").length;
  const deletions = diffLines.filter((l) => l.tone === "remove").length;

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Generated diff</h2>
        {diffLines[0]?.id !== "no-changes" && (
          <span className="text-xs text-rescue-green">
            +{additions} -{deletions}
          </span>
        )}
      </div>
      <div className="space-y-2 font-mono text-xs">
        {diffLines.map((line) => (
          <p
            key={line.id}
            className={cn(
              "rounded px-2 py-1 truncate",
              line.tone === "add"
                ? "bg-rescue-green/10 text-rescue-green"
                : line.tone === "remove"
                  ? "bg-rescue-pink/10 text-rescue-pink"
                  : "bg-white/5 text-slate-400"
            )}
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}

