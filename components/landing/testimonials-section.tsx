"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Senior SWE",
    company: "Stripe",
    avatar: "AM",
    avatarColor: "#7B61FF",
    text: "Our prod went down at 2AM and I fixed a critical null-ref using CodeRescue from my phone. Shipped in under 90 seconds. This product is insane.",
    stars: 5,
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "Vercel Labs",
    avatar: "SC",
    avatarColor: "#00D9FF",
    text: "The AI's accuracy is genuinely shocking. It caught a race condition our entire team missed and generated a correct fix on the first try.",
    stars: 5,
  },
  {
    name: "Marcus Delacroix",
    role: "DevOps Lead",
    company: "Shopify",
    avatar: "MD",
    avatarColor: "#FF4FD8",
    text: "Replaced three internal tools with CodeRescue AI. Deployment recovery times went from hours to minutes. The GitHub sync is flawless.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Full-stack Engineer",
    company: "Linear",
    avatar: "PN",
    avatarColor: "#00FFA3",
    text: "I was skeptical of AI coding tools but this one is different. The context awareness is miles ahead of anything else I've used.",
    stars: 5,
  },
  {
    name: "Tom Eriksson",
    role: "Platform Engineer",
    company: "Datadog",
    avatar: "TE",
    avatarColor: "#4F8CFF",
    text: "Emergency mobile fixes used to be a nightmare. Now I open CodeRescue on my iPad and have a patch committed in under a minute.",
    stars: 5,
  },
  {
    name: "Lena Hoffmann",
    role: "Engineering Manager",
    company: "N26",
    avatar: "LH",
    avatarColor: "#FF4D6D",
    text: "Rolled this out to my entire team. MTTR dropped by 78% in the first month. The AI commit messages alone save us hours per week.",
    stars: 5,
  },
];

// Double the array for seamless marquee
const row1 = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="shrink-0 w-80 p-5 rounded-2xl border border-white/7 bg-white/[0.025] backdrop-blur-sm hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 mx-3"
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(t.stars)].map((_, i) => (
          <Star key={i} size={12} fill="#ffd166" className="text-[#ffd166]" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/60 text-sm leading-relaxed mb-4">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.3), ${t.avatarColor})` }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{t.name}</div>
          <div className="text-white/35 text-xs">
            {t.role} · {t.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FF4FD8]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7B61FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF4FD8]/25 bg-[#FF4FD8]/5 text-[#FF4FD8] text-sm font-medium mb-5"
          >
            <Star size={12} fill="#FF4FD8" />
            Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Loved by engineers{" "}
            <span className="text-gradient-cyan">worldwide</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-lg max-w-xl mx-auto"
          >
            From 2AM incidents to daily workflows — engineers trust CodeRescue AI.
          </motion.p>
        </div>

        {/* Marquee row */}
        <div className="marquee-container">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {row1.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
