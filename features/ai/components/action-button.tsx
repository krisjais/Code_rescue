"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionButtonProps = {
  icon: LucideIcon;
  label: string;
  hot?: boolean;
  onClick: () => void;
};

export function ActionButton({ icon: Icon, label, hot, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "focus-ring flex min-h-12 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium transition",
        hot
          ? "border-rescue-cyan/40 bg-rescue-cyan/15 text-rescue-cyan hover:bg-rescue-cyan/20"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
