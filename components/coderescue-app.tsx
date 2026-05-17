"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  FileCode2,
  Github,
  GitBranch,
  Loader2,
  Rocket,
  Search,
  ShieldAlert,
  Sparkles,
  Zap
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { repositories as fallbackRepositories, type Repo } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type AuthDiagnostics = {
  githubConfigured: boolean;
  nextAuthUrl: string;
  callbackUrl: string;
};

export function CodeRescueApp() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [repos, setRepos] = useState<Repo[]>(fallbackRepositories);
  const [repoSource, setRepoSource] = useState<"mock" | "github">("mock");
  const [diagnostics, setDiagnostics] = useState<AuthDiagnostics | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      setAuthError(
        "GitHub sign in failed. Check your GitHub OAuth Client ID, Client Secret, and callback URL."
      );
    }

    fetch("/api/auth/diagnostics")
      .then((response) => response.json())
      .then(setDiagnostics)
      .catch(() => setDiagnostics(null));
  }, []);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    fetch("/api/github/repositories")
      .then((response) => response.json())
      .then((data: { repositories?: Repo[]; source?: "mock" | "github" }) => {
        if (data.repositories?.length) {
          setRepos(data.repositories);
          setRepoSource(data.source ?? "mock");
        }
      })
      .catch(() => {
        setRepos(fallbackRepositories);
        setRepoSource("mock");
      });
  }, [status]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin text-rescue-cyan" />
          Preparing CodeRescue AI...
        </div>
      </main>
    );
  }

  if (status !== "authenticated") {
    return (
      <LandingPage
        diagnostics={diagnostics}
        authError={authError}
        onSignIn={() => {
          if (!diagnostics?.githubConfigured) {
            setAuthError("GitHub OAuth is not configured yet. Add your client secret to .env.local, restart the dev server, then try again.");
            return;
          }

          signIn("github", { callbackUrl: "/" });
        }}
      />
    );
  }

  return (
    <RepositoryPicker
      repos={repos}
      source={repoSource}
      userName={session.user?.name ?? session.user?.email ?? "developer"}
      onChoose={(repoId) => router.push(`/workspace/${repoId}`)}
    />
  );
}

function LandingPage({
  diagnostics,
  authError,
  onSignIn
}: {
  diagnostics: AuthDiagnostics | null;
  authError: string | null;
  onSignIn: () => void;
}) {
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

          {authError && (
            <div className="mt-6 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
              {authError}
              {diagnostics && (
                <p className="mt-2 text-red-100/80">
                  GitHub configured: {diagnostics.githubConfigured ? "yes" : "no"}. Callback URL must be{" "}
                  <span className="font-mono">{diagnostics.callbackUrl}</span>.
                </p>
              )}
            </div>
          )}

          {diagnostics && !diagnostics.githubConfigured && (
            <div className="mt-6 rounded-lg border border-rescue-amber/30 bg-rescue-amber/10 p-4 text-sm leading-6 text-rescue-amber">
              Add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` to `.env.local`, then restart the dev server.
            </div>
          )}

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

function RepositoryPicker({
  repos,
  source,
  userName,
  onChoose
}: {
  repos: Repo[];
  source: "mock" | "github";
  userName: string;
  onChoose: (repoId: string) => void;
}) {
  return (
    <main className="min-h-screen px-4 py-5 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-rescue-green">
              <CheckCircle2 className="h-4 w-4" />
              Signed in as {userName}
            </div>
            <h1 className="text-3xl font-semibold text-white">Choose a repository to rescue</h1>
            <p className="mt-2 text-slate-400">
              {source === "github" ? "These are your GitHub repositories." : "Showing demo repositories until GitHub keys are configured."}
            </p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input
              className="focus-ring h-11 w-full rounded-lg border border-white/10 bg-black/20 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500"
              placeholder="Search repositories"
            />
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => (
            <button
              key={repo.id}
              onClick={() => onChoose(repo.id)}
              className="focus-ring group rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-rescue-cyan/40 hover:bg-rescue-cyan/10"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/25 text-rescue-cyan">
                  <FileCode2 className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400">{repo.branch}</span>
              </div>
              <h2 className="text-lg font-semibold text-white">{repo.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{repo.owner}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2 text-slate-400">
                  <GitBranch className="h-4 w-4" />
                  {repo.updated}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-rescue-cyan">
                  Open
                  <Rocket className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-rescue-cyan/20 bg-rescue-cyan/[0.06] p-4 text-sm text-slate-300">
          <Sparkles className="mr-2 inline h-4 w-4 text-rescue-cyan" />
          After choosing a repo, CodeRescue opens the editor and AI assistant for that repository.
        </div>
      </div>
    </main>
  );
}
