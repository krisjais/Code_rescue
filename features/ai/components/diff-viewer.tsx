import { demoDiff } from "@/features/ai/lib/demo-ai";
import { cn } from "@/lib/utils";

export function DiffViewer() {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Generated diff</h2>
        <span className="text-xs text-rescue-green">+12 -3</span>
      </div>
      <div className="space-y-2 font-mono text-xs">
        {demoDiff.map((line) => (
          <p
            key={line.id}
            className={cn(
              "rounded px-2 py-1",
              line.tone === "add" ? "bg-rescue-green/10 text-rescue-green" : "bg-rescue-pink/10 text-rescue-pink"
            )}
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}
