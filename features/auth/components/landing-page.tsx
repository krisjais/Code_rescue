"use client";

import { ArrowRight, Bot, Code2, Github, ShieldAlert, Zap } from "lucide-react";
import { InlineAlert } from "@/features/diagnostics/components/inline-alert";
import type { AuthDiagnostics } from "@/features/auth/services/client";
import { cn } from "@/lib/utils";

type LandingPageProps = {
  diagnostics: AuthDiagnostics | null;
  authError: string | null;
  onSignIn: () => void;
};

export function LandingPage({ diagnostics, authError, onSignIn }: LandingPageProps) {
  return (
    <main className="min-h-screen overflow-hidden text-slate-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rescue-cyan/30 bg-rescue-cyan/10 shadow-glow">
            <ShieldAlert className="h-5 w-5 text-rescue-cyan" />
          </div>
          <span className="text-lg font-semibold text-white">CodeRescue AI</span>
        </div>
        <button
          onClick={onSignIn}
          className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-rescue-green"
        >
          <Github className="h-4 w-4" />
          Sign in with GitHub
        </button>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-10 px-5 pb-10 pt-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-3xl animate-floatIn">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rescue-green/25 bg-rescue-green/10 px-3 py-1 text-sm text-rescue-green">
            <Zap className="h-4 w-4" />
            Emergency browser coding workspace
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-normal text-white md:text-7xl">
            CodeRescue AI
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Connect GitHub, choose a repo, paste a failing deploy log, and let AI explain, patch, and prepare a commit from the browser.
          </p>

          <div className="mt-6 space-y-4">
            {authError && (
              <InlineAlert tone="danger">
                {authError}
                {diagnostics && (
                  <p className="mt-2 text-red-100/80">
                    GitHub configured: {diagnostics.githubConfigured ? "yes" : "no"}. Callback URL must be{" "}
                    <span className="font-mono">{diagnostics.callbackUrl}</span>.
                  </p>
                )}
              </InlineAlert>
            )}

            {diagnostics && !diagnostics.githubConfigured && (
              <InlineAlert tone="warning">
                Add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` to `.env.local`, then restart the dev server.
              </InlineAlert>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onSignIn}
              className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg bg-rescue-cyan px-5 text-sm font-semibold text-slate-950 transition hover:bg-rescue-green"
            >
              <Github className="h-4 w-4" />
              Continue with GitHub
            </button>
            <a
              href="#flow"
              className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              See workflow
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <HeroPreview />
      </section>

      <section id="flow" className="mx-auto grid max-w-7xl gap-3 px-5 pb-14 md:grid-cols-4">
        {["Sign in", "Pick repo", "Fix with AI", "Push patch"].map((item, index) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="mb-3 text-xs text-slate-500">0{index + 1}</p>
            <p className="font-semibold text-white">{item}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

function HeroPreview() {
  return (
    <div className="relative min-h-[520px] animate-floatIn">
      <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-[#050711] shadow-card" />
      <div className="absolute inset-4 overflow-hidden rounded-2xl border border-white/10 bg-[#080d18]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Code2 className="h-4 w-4 text-rescue-green" />
            rescue-web/app/api/auth/callback.ts
          </div>
          <span className="rounded-full bg-rescue-pink/10 px-2.5 py-1 text-xs text-rescue-pink">Build failing</span>
        </div>
        <div className="grid h-[calc(100%-49px)] grid-cols-[180px_1fr]">
          <div className="border-r border-white/10 bg-black/20 p-4">
            {["rescue-web", "mobile-hotfix", "api-gateway"].map((repo, index) => (
              <div
                key={repo}
                className={cn(
                  "mb-3 rounded-lg border px-3 py-3 text-sm",
                  index === 0 ? "border-rescue-cyan/30 bg-rescue-cyan/10 text-white" : "border-white/10 text-slate-400"
                )}
              >
                {repo}
              </div>
            ))}
          </div>
          <div className="grid grid-rows-[1fr_190px]">
            <div className="p-5 font-mono text-sm leading-7 text-slate-300">
              <p><span className="text-rescue-pink">error</span> GitHub OAuth callback failed</p>
              <p><span className="text-rescue-cyan">fix</span> Add JSON content type header</p>
              <p><span className="text-rescue-green">safe</span> Return session status, not raw token</p>
            </div>
            <div className="border-t border-white/10 bg-rescue-cyan/[0.06] p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold text-white">
                <Bot className="h-4 w-4 text-rescue-cyan" />
                AI rescue plan
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Root cause found. Patch generated. Commit message ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
