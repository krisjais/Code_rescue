"use client";

import { motion } from "framer-motion";
import { Github, Zap, ArrowRight } from "lucide-react";

type CTASectionProps = {
  onSignIn?: () => void;
};

export function CTASection({ onSignIn }: CTASectionProps) {
  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      {/* Huge central glow orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-gradient-to-br from-[#7B61FF]/20 via-[#00D9FF]/10 to-[#FF4FD8]/10 blur-[120px] animate-orb" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/25 bg-[#00D9FF]/5 text-[#00D9FF] text-sm font-medium mb-8"
        >
          <Zap size={13} fill="#00D9FF" />
          Start for free today
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.05]"
        >
          Start fixing{" "}
          <span className="text-gradient-cyan">production</span>
          <br />
          issues with AI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/45 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join 4,200+ engineers who use CodeRescue AI to fix bugs faster, ship safer, and recover from incidents in record time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={onSignIn}
            className="relative flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base overflow-hidden group transition-transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#00D9FF]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#00D9FF] blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <Zap size={18} className="relative" fill="white" />
            <span className="relative">Get Started Free</span>
            <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white/70 hover:text-white border border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.06] transition-all text-base hover:scale-[1.03] active:scale-[0.98]"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/25"
        >
          {["No credit card required", "GitHub OAuth in 1 click", "Cancel anytime"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FFA3]" />
              {t}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
