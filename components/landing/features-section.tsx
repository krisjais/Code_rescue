"use client";

import { motion } from "framer-motion";
import { Bug, GitBranch, Code2, Sparkles, GitCommit, Smartphone } from "lucide-react";

const features = [
  {
    icon: Bug,
    title: "AI Deployment Debugging",
    description: "AI instantly analyzes stack traces, pinpoints root causes, and generates targeted fixes for your deployment failures.",
    color: "#FF4D6D",
    glow: "rgba(255,77,109,0.15)",
  },
  {
    icon: GitBranch,
    title: "GitHub Repository Sync",
    description: "Seamlessly connect and sync any GitHub repo. Browse branches, files, and commit history directly in your browser.",
    color: "#00D9FF",
    glow: "rgba(0,217,255,0.15)",
  },
  {
    icon: Code2,
    title: "Browser Code Editing",
    description: "Monaco-powered editor with full IntelliSense, syntax highlighting, and multi-file editing — no setup needed.",
    color: "#7B61FF",
    glow: "rgba(123,97,255,0.15)",
  },
  {
    icon: Sparkles,
    title: "AI Feature Generation",
    description: "Describe a feature in natural language and watch the AI generate clean, production-ready code in seconds.",
    color: "#FF4FD8",
    glow: "rgba(255,79,216,0.15)",
  },
  {
    icon: GitCommit,
    title: "Commit & Push with AI",
    description: "AI writes your commit messages, stages the right files, and pushes to your branch — one click, zero friction.",
    color: "#00FFA3",
    glow: "rgba(0,255,163,0.15)",
  },
  {
    icon: Smartphone,
    title: "Emergency Mobile Fixes",
    description: "Push hotfixes from your phone or tablet during incidents. Full workspace, fully responsive, always available.",
    color: "#4F8CFF",
    glow: "rgba(79,140,255,0.15)",
  },
];

import type { Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7B61FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7B61FF]/25 bg-[#7B61FF]/5 text-[#7B61FF] text-sm font-medium mb-5"
          >
            <Sparkles size={13} />
            Capabilities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Everything you need to{" "}
            <span className="text-gradient-cyan">ship fast</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/45 max-w-2xl mx-auto"
          >
            A complete emergency coding toolkit built for the moments when every second counts.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative rounded-2xl p-6 cursor-default overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${feat.glow} 0%, transparent 65%)`,
                }}
              />

              {/* Border glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ border: `1px solid ${feat.color}30` }}
              />

              {/* Icon */}
              <div
                className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${feat.glow}`,
                  border: `1px solid ${feat.color}25`,
                }}
              >
                <feat.icon size={20} style={{ color: feat.color }} />
                <div
                  className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: feat.color }}
                />
              </div>

              {/* Content */}
              <h3 className="relative text-white font-semibold text-lg mb-2 tracking-tight">
                {feat.title}
              </h3>
              <p className="relative text-white/45 text-sm leading-relaxed">
                {feat.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.color}50, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
