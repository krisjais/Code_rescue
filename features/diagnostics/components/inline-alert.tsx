import { cn } from "@/lib/utils";

type InlineAlertProps = {
  tone?: "danger" | "warning" | "info";
  children: React.ReactNode;
};

export function InlineAlert({ tone = "info", children }: InlineAlertProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 text-sm leading-6",
        tone === "danger" && "border-red-400/30 bg-red-500/10 text-red-100",
        tone === "warning" && "border-rescue-amber/30 bg-rescue-amber/10 text-rescue-amber",
        tone === "info" && "border-rescue-cyan/20 bg-rescue-cyan/[0.06] text-slate-300"
      )}
    >
      {children}
    </div>
  );
}
