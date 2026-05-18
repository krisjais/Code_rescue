"use client";

import { motion } from "framer-motion";
import { Github, Play, Zap, Terminal, GitBranch, AlertTriangle, CheckCircle2, Cpu } from "lucide-react";

function IDEMockup() {
  return (
    <div className="relative w-full max-w-[580px] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7B61FF]/20 via-transparent to-[#00D9FF]/20 blur-2xl scale-110" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="relative rounded-2xl border border-white/10 bg-[rgba(7,11,26,0.9)] backdrop-blur-xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF4D6D]" />
            <div className="w-3 h-3 rounded-full bg-[#ffd166]" />
            <div className="w-3 h-3 rounded-full bg-[#00FFA3]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 px-3 py-0.5 rounded bg-white/5 text-[11px] text-white/40">
              <Zap size={10} className="text-[#00D9FF]" />
              coderescue.ai/workspace
            </div>
          </div>
        </div>

        <div className="flex" style={{ height: 360 }}>
          {/* Sidebar */}
          <div className="w-36 border-r border-white/5 bg-white/[0.01] p-2 flex flex-col gap-1 shrink-0">
            <div className="text-[10px] text-white/30 px-2 mb-1 uppercase tracking-wider">Repos</div>
            {["my-app", "api-server", "dashboard"].map((repo, i) => (
              <div
                key={repo}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] cursor-pointer transition-colors ${
                  i === 0 ? "bg-[#7B61FF]/20 text-[#00D9FF] border border-[#7B61FF]/30" : "text-white/40 hover:text-white/60 hover:bg-white/5"
                }`}
              >
                <GitBranch size={10} />
                {repo}
              </div>
            ))}
            <div className="mt-auto pt-2 border-t border-white/5">
              <div className="text-[10px] text-white/30 px-2 mb-1">Branch</div>
              <div className="flex items-center gap-1 px-2 py-1 text-[10px] text-[#00FFA3]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" />
                main
              </div>
            </div>
          </div>

          {/* Editor pane */}
          <div className="flex-1 p-3 font-mono text-[11px] leading-relaxed overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-white/20 text-[10px]">api/deploy.ts</div>
              <div className="flex items-center gap-1 ml-auto px-1.5 py-0.5 rounded bg-[#FF4D6D]/10 border border-[#FF4D6D]/30 text-[10px] text-[#FF4D6D]">
                <AlertTriangle size={8} />
                Error
              </div>
            </div>
            <div className="space-y-1">
              <div><span className="text-white/20">1 </span><span className="text-[#7B61FF]">import</span><span className="text-white/70"> {"{"} deploy {"}"} </span><span className="text-[#7B61FF]">from</span><span className="text-[#00FFA3]"> &apos;./lib&apos;</span></div>
              <div><span className="text-white/20">2 </span></div>
              <div><span className="text-white/20">3 </span><span className="text-[#7B61FF]">export async function</span><span className="text-[#00D9FF]"> handler</span><span className="text-white/70">(req) {"{"}</span></div>
              <div className="bg-[#FF4D6D]/5 border-l-2 border-[#FF4D6D]/60 pl-2 -ml-1"><span className="text-white/20">4 </span><span className="text-white/60">  </span><span className="text-[#7B61FF]">const</span><span className="text-white/70"> res = </span><span className="text-[#7B61FF]">await</span><span className="text-[#00D9FF]"> deploy</span><span className="text-[#FF4D6D]">(undefined)</span></div>
              <div><span className="text-white/20">5 </span><span className="text-white/60">  </span><span className="text-white/70">return res.data</span></div>
              <div><span className="text-white/20">6 </span><span className="text-white/70">{"}"}</span></div>
            </div>

            {/* AI suggestion box */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-4 rounded-lg border border-[#7B61FF]/30 bg-[#7B61FF]/5 p-2.5"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Cpu size={10} className="text-[#7B61FF]" />
                <span className="text-[10px] text-[#7B61FF] font-semibold">AI Fix Suggestion</span>
              </div>
              <div className="text-[10px] text-white/50">Replace <span className="text-[#FF4D6D]">undefined</span> with <span className="text-[#00FFA3]">req.body</span> — missing payload causes null dereference.</div>
            </motion.div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-white/5 bg-white/[0.02] text-[10px]">
          <div className="flex items-center gap-1.5 text-white/30">
            <Terminal size={10} />
            Ready
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00FFA3]/10 border border-[#00FFA3]/30 text-[#00FFA3]"
          >
            <CheckCircle2 size={9} />
            AI patch ready — 1 change
          </motion.div>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#00D9FF]"
          style={{
            top: `${20 + i * 12}%`,
            right: `-${4 + i * 2}%`,
            opacity: 0.4 - i * 0.05,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

import type { AuthDiagnostics } from "@/features/auth/services/client";
import { InlineAlert } from "@/features/diagnostics/components/inline-alert";

type HeroSectionProps = {
  onSignIn?: () => void;
  diagnostics?: AuthDiagnostics | null;
  authError?: string | null;
};

export function HeroSection({ onSignIn, diagnostics, authError }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#7B61FF]/10 blur-[120px] pointer-events-none animate-orb" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#00D9FF]/8 blur-[100px] pointer-events-none" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-[#FF4FD8]/6 blur-[80px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D9FF]/25 bg-[#00D9FF]/5 text-[#00D9FF] text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                Emergency browser coding workspace
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-[68px] font-extrabold leading-[1.05] tracking-tight"
            >
              <span className="text-gradient-hero">Fix production</span>
              <br />
              <span className="text-white">bugs from anywhere</span>
              <br />
              <span className="text-gradient-cyan">using AI</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg text-white/55 leading-relaxed max-w-lg"
            >
              Connect your GitHub repos, diagnose deployment failures, edit code in the browser, and ship AI-generated fixes — all in one cinematic workspace.
            </motion.p>

            {/* Diagnostics alerts */}
            {(authError || (diagnostics && !diagnostics.githubConfigured)) && (
              <motion.div custom={2.5} variants={fadeUp} initial="hidden" animate="visible" className="space-y-3 max-w-lg">
                {authError && (
                  <InlineAlert tone="danger">
                    {authError}
                    {diagnostics && (
                      <p className="mt-1.5 text-xs text-red-200/80">
                        GitHub configured: {diagnostics.githubConfigured ? "yes" : "no"}. Callback URL must match{" "}
                        <span className="font-mono bg-black/20 px-1 py-0.5 rounded">{diagnostics.callbackUrl}</span>
                      </p>
                    )}
                  </InlineAlert>
                )}
                {diagnostics && !diagnostics.githubConfigured && (
                  <InlineAlert tone="warning">
                    Add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXTAUTH_SECRET` to `.env.local`, then restart the server.
                  </InlineAlert>
                )}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={onSignIn}
                className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden group transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#00D9FF]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#00D9FF] blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                <Github size={18} className="relative" />
                <span className="relative">Connect GitHub</span>
              </button>

              <a
                href="#workflow"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play size={16} fill="currentColor" />
                See Workflow
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 text-sm text-white/30"
            >
              <div className="flex -space-x-2">
                {["#7B61FF", "#00D9FF", "#FF4FD8", "#00FFA3"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#050816] flex items-center justify-center text-[10px] font-bold"
                    style={{ background: `radial-gradient(circle at 40% 35%, white, ${c})` }}
                  />
                ))}
              </div>
              <span>Trusted by <strong className="text-white/60">4,200+</strong> engineers</span>
            </motion.div>
          </div>

          {/* Right — IDE Mockup */}
          <div className="relative lg:pl-8">
            <IDEMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
