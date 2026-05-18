"use client";

import { Github, Twitter, Zap } from "lucide-react";
import Link from "next/link";

const links = {
  Product: ["Features", "Workflow", "AI Engine", "Changelog"],
  Developers: ["Docs", "API Reference", "GitHub", "Status"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Security", "Cookies"],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050816] overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#7B61FF]/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7B61FF]" />
                <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                  <Zap size={14} className="text-white" fill="white" />
                </div>
              </div>
              <span className="text-white font-semibold text-sm">
                CodeRescue <span className="text-[#00D9FF]">AI</span>
              </span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-5 max-w-[200px]">
              AI-powered emergency coding workspace for engineers who ship.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <Github size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div className="text-white/60 font-semibold text-sm mb-4">{section}</div>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/35 hover:text-white/70 text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/25">
          <div>© 2026 CodeRescue AI. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
