"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Menu, X, Zap } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "AI Engine", href: "#demo" },
  { label: "Pricing", href: "#stats" },
  { label: "Docs", href: "#" },
];

type NavbarProps = {
  onSignIn?: () => void;
};

export function Navbar({ onSignIn }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 40));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`w-full max-w-6xl rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(5,8,22,0.85)] backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "bg-[rgba(5,8,22,0.5)] backdrop-blur-md border border-white/5"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7B61FF] opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white" fill="white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7B61FF] blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">
              CodeRescue <span className="text-[#00D9FF]">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
            >
              <Github size={14} />
              GitHub
            </a>
            <button
              onClick={onSignIn}
              className="relative px-4 py-1.5 text-sm font-semibold text-white rounded-lg overflow-hidden group transition-all duration-200 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#00D9FF] opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#7B61FF] to-[#00D9FF] blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative">Get Started</span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 pt-3 border-t border-white/5 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-white/5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-white/60 border border-white/10 rounded-lg"
              >
                <Github size={14} /> GitHub
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSignIn?.();
                }}
                className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#7B61FF] to-[#00D9FF] rounded-lg cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
