import { CheckCircle2, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastProps = {
  message: string | null;
  tone?: "success" | "warning";
};

export function Toast({ message, tone = "success" }: ToastProps) {
  if (!message) return null;

  const Icon = tone === "success" ? CheckCircle2 : CircleAlert;

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-card backdrop-blur-xl",
        tone === "success"
          ? "border-rescue-green/30 bg-rescue-green/10 text-rescue-green"
          : "border-rescue-amber/30 bg-rescue-amber/10 text-rescue-amber"
      )}
    >
      <Icon className="h-4 w-4" />
      {message}
    </div>
  );
}
