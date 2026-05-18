"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { value: "98.7%", label: "AI Fix Accuracy", color: "#00FFA3", sub: "Verified across 50K+ incidents" },
  { value: "< 60s", label: "Deployment Recovery", color: "#00D9FF", sub: "Average time to resolve" },
  { value: "120K+", label: "Repos Synced", color: "#7B61FF", sub: "Active GitHub connections" },
  { value: "4,200+", label: "Developers Assisted", color: "#FF4FD8", sub: "Engineers worldwide" },
];

function AnimatedNumber({ target }: { target: string }) {
  // Just render the value directly for simplicity & performance
  return <span>{target}</span>;
}

export function StatsSection() {
  return (
    <section id="stats" className="relative py-24 overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#070B1A] to-[#050816] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#7B61FF]/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 lg:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 text-center overflow-hidden"
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${stat.color}10 0%, transparent 70%)`,
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-1/4 right-1/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}70, transparent)` }}
              />

              <div
                className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-2"
                style={{ color: stat.color }}
              >
                <AnimatedNumber target={stat.value} />
              </div>

              <div className="text-white font-semibold text-sm lg:text-base mb-1">
                {stat.label}
              </div>

              <div className="text-white/35 text-xs lg:text-sm">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
