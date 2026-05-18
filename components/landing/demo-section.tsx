"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Terminal, Cpu, Copy, Check } from "lucide-react";

const errorLog = `[ERROR] Build failed at 2026-05-18T09:41:22Z
TypeError: Cannot read properties of undefined
  at deploy (/api/deploy.ts:4:18)
  at handler (/api/deploy.ts:8:22)
  at processTicksAndRejections

Stack trace:
  deploy(undefined)  ← missing payload
  handler(req)
  Next.js internals

Exit code: 1
Deployment rolled back.`;

const aiLines = [
  { type: "label", text: "🔍 Root Cause" },
  { type: "body", text: "deploy() called with undefined instead of req.body. The destructured payload is null at runtime." },
  { type: "spacer" },
  { type: "label", text: "🧩 Explanation" },
  { type: "body", text: "The handler passes the entire request object instead of its body. deploy() expects a typed PayloadObject." },
  { type: "spacer" },
  { type: "label", text: "✅ Fix" },
  { type: "code", text: "- const res = await deploy(undefined)" },
  { type: "code-add", text: "+ const res = await deploy(req.body)" },
  { type: "spacer" },
  { type: "label", text: "📦 Corrected Code" },
];

const correctedCode = `export async function handler(req) {
  const res = await deploy(req.body)
  return res.data
}`;

export function DemoSection() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(correctedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="demo" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00D9FF]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF4FD8]/25 bg-[#FF4FD8]/5 text-[#FF4FD8] text-sm font-medium mb-5"
          >
            <Terminal size={13} />
            Live AI Demo
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Watch the AI{" "}
            <span className="text-gradient-cyan">diagnose & fix</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-lg max-w-xl mx-auto"
          >
            Real deployment error. Real AI response. Zero hallucinations.
          </motion.p>
        </div>

        {/* Two-panel demo */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Left — Error logs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-white/7 bg-[rgba(255,77,109,0.03)] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
              <span className="text-[#FF4D6D] text-xs font-semibold font-mono">DEPLOYMENT ERROR</span>
              <div className="ml-auto flex gap-1">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            </div>
            <pre className="p-4 text-[11px] font-mono text-white/50 leading-relaxed whitespace-pre-wrap">
              {errorLog}
            </pre>
          </motion.div>

          {/* Right — AI response */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-[#7B61FF]/20 bg-[rgba(123,97,255,0.03)] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#7B61FF]/15 bg-[#7B61FF]/5">
              <Cpu size={12} className="text-[#7B61FF]" />
              <span className="text-[#7B61FF] text-xs font-semibold">CodeRescue AI — Analysis</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" />
            </div>

            <div className="p-4 space-y-1.5 text-[12px]">
              {aiLines.map((line, i) => {
                if (line.type === "spacer") return <div key={i} className="h-2" />;
                if (line.type === "label")
                  return (
                    <div key={i} className="text-[#00D9FF] font-semibold text-[11px] uppercase tracking-wider mt-1">
                      {line.text}
                    </div>
                  );
                if (line.type === "body")
                  return (
                    <p key={i} className="text-white/55 leading-relaxed">
                      {line.text}
                    </p>
                  );
                if (line.type === "code")
                  return (
                    <div key={i} className="font-mono bg-[#FF4D6D]/10 border-l-2 border-[#FF4D6D]/50 px-3 py-1 rounded text-[#FF4D6D] text-[11px]">
                      {line.text}
                    </div>
                  );
                if (line.type === "code-add")
                  return (
                    <div key={i} className="font-mono bg-[#00FFA3]/10 border-l-2 border-[#00FFA3]/50 px-3 py-1 rounded text-[#00FFA3] text-[11px]">
                      {line.text}
                    </div>
                  );
                return null;
              })}

              {/* Code block */}
              <div className="relative mt-2 rounded-xl border border-white/7 bg-[rgba(0,0,0,0.3)] overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                  <span className="text-[10px] text-white/30 font-mono">api/deploy.ts</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/60 transition-colors"
                  >
                    {copied ? <Check size={10} className="text-[#00FFA3]" /> : <Copy size={10} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="p-3 text-[11px] font-mono leading-relaxed text-[#00FFA3] whitespace-pre">
                  {correctedCode}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
