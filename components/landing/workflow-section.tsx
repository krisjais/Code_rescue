"use client";

import { motion } from "framer-motion";
import { GitBranch, AlertTriangle, Cpu, Wand2, Eye, GitCommit, ArrowDown } from "lucide-react";

const steps = [
  { icon: GitBranch, label: "GitHub Repo", desc: "Connect any repository", color: "#00D9FF" },
  { icon: AlertTriangle, label: "Deployment Error", desc: "Error detected instantly", color: "#FF4D6D" },
  { icon: Cpu, label: "AI Analysis", desc: "Root cause identification", color: "#7B61FF" },
  { icon: Wand2, label: "Patch Generation", desc: "AI writes the fix", color: "#FF4FD8" },
  { icon: Eye, label: "Review Changes", desc: "Diff view & approval", color: "#4F8CFF" },
  { icon: GitCommit, label: "Commit & Push", desc: "Ship to production", color: "#00FFA3" },
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="relative py-32 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7B61FF]/8 blur-[140px] pointer-events-none animate-orb" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/25 bg-[#00D9FF]/5 text-[#00D9FF] text-sm font-medium mb-5"
          >
            <Cpu size={13} />
            AI Workflow
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            From error to fix in{" "}
            <span className="text-gradient-cyan">under 60 seconds</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-lg max-w-xl mx-auto"
          >
            A battle-tested pipeline from incident detection to production fix.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Steps column */}
          <div className="flex flex-col gap-0 w-full lg:w-96 shrink-0">
            {steps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group w-full flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 cursor-default"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    <step.icon size={18} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{step.label}</div>
                    <div className="text-white/40 text-xs mt-0.5">{step.desc}</div>
                  </div>
                  <div
                    className="ml-auto w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"
                    style={{ background: step.color }}
                  />
                </motion.div>

                {i < steps.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-px h-4 bg-gradient-to-b from-white/10 to-white/5" />
                    <ArrowDown size={12} className="text-white/15" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Center orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* Outer rings */}
              {[280, 220, 160].map((size, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    width: size,
                    height: size,
                    borderColor: `rgba(123, 97, 255, ${0.08 + i * 0.04})`,
                    animation: `spin-slow ${20 + i * 8}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
                  }}
                />
              ))}

              {/* Glowing dots on ring */}
              {steps.map((step, i) => {
                const angle = (i / steps.length) * 2 * Math.PI - Math.PI / 2;
                const r = 100;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <motion.div
                    key={step.label}
                    className="absolute w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${x}px - 16px)`,
                      top: `calc(50% + ${y}px - 16px)`,
                      background: `${step.color}20`,
                      border: `1px solid ${step.color}50`,
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.35 }}
                  >
                    <step.icon size={14} style={{ color: step.color }} />
                  </motion.div>
                );
              })}

              {/* Core orb */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#00D9FF] opacity-80" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#00D9FF] blur-xl opacity-50 animate-pulse" />
                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                  <Cpu size={36} className="text-white" />
                </div>
                <div className="absolute -inset-4 rounded-full border border-[#7B61FF]/20 animate-pulse" />
              </div>

              {/* Label */}
              <div className="absolute bottom-0 text-center">
                <div className="text-xs text-white/40 font-mono">AI Core</div>
              </div>
            </div>
          </motion.div>

          {/* Right — timing stats */}
          <div className="flex flex-col gap-4 w-full lg:w-64 shrink-0">
            {[
              { label: "Error Detection", value: "< 1s", color: "#00D9FF" },
              { label: "AI Analysis", value: "~3s", color: "#7B61FF" },
              { label: "Patch Generation", value: "~8s", color: "#FF4FD8" },
              { label: "Full Recovery", value: "< 60s", color: "#00FFA3" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <div className="text-white/40 text-xs mb-1">{stat.label}</div>
                <div className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
