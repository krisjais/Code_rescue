"use client";

import {
  Activity,
  Bot,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Diff,
  FileCode2,
  GitBranch,
  Github,
  Laptop,
  Loader2,
  LockKeyhole,
  LogOut,
  PanelLeft,
  Rocket,
  Save,
  Send,
  ShieldAlert,
  Sparkles,
  Wand2,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { MonacoPane } from "@/components/monaco-pane";
import { cn } from "@/lib/utils";
import { deploymentLog, repositories as fallbackRepositories, type Repo, type RepoFile } from "@/lib/mock-data";

type AssistantMode = "explain" | "fix" | "optimize" | "feature";

const aiResponses: Record<AssistantMode, string> = {
  explain:
    "The deployment is failing during the GitHub OAuth callback. The token exchange request is missing the Content-Type header, so the provider may reject or misread the JSON body. The route also returns the raw token payload to the client, which is risky for production.",
  fix:
    "I patched the OAuth callback to send Content-Type: application/json, validate the GitHub response, and return a safe session handoff shape. Review the diff, then commit the hotfix to main.",
  optimize:
    "Optimization path: move GitHub token handling behind NextAuth, cache repository metadata in Supabase, and lazy-load the Monaco bundle only after a repository is opened.",
  feature:
    "Feature generated: a responsive emergency mode banner, AI commit-message draft, and repository risk status. These changes keep the MVP demo focused on urgent browser-based recovery."
};

const fixedCode = `import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: "GitHub token exchange failed" },
      { status: tokenResponse.status }
    );
  }

  const token = await tokenResponse.json();

  return NextResponse.json({
    connected: true,
    scope: token.scope,
    tokenType: token.token_type
  });
}
`;

const editorStats: Array<[string, string, LucideIcon]> = [
  ["AI patch applied", "Ready for review", Check],
  ["Framework", "Next.js detected", Laptop],
  ["Provider", "Vercel log parser", Activity]
];

type CodeRescueWorkspaceProps = {
  repositories?: Repo[];
  initialRepoId?: string;
  userName?: string;
  onBackToRepos?: () => void;
};

export function CodeRescueWorkspace({
  repositories = fallbackRepositories,
  initialRepoId,
  userName = "developer",
  onBackToRepos
}: CodeRescueWorkspaceProps) {
  const [selectedRepoId, setSelectedRepoId] = useState(initialRepoId ?? repositories[0].id);
  const selectedRepo = repositories.find((repo) => repo.id === selectedRepoId) ?? repositories[0];
  const [selectedFileId, setSelectedFileId] = useState(selectedRepo.files[0].id);
  const selectedFile = selectedRepo.files.find((file) => file.id === selectedFileId) ?? selectedRepo.files[0];
  const [openTabs, setOpenTabs] = useState<RepoFile[]>(selectedRepo.files.slice(0, 2));
  const [fileContent, setFileContent] = useState(selectedFile.content);
  const [logText, setLogText] = useState(deploymentLog);
  const [prompt, setPrompt] = useState("Fix the GitHub OAuth deployment error and keep tokens server-side.");
  const [assistantMode, setAssistantMode] = useState<AssistantMode>("fix");
  const [isGenerating, setIsGenerating] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const currentRepo = repositories.find((repo) => repo.id === initialRepoId) ?? repositories[0];
    if (currentRepo) {
      setSelectedRepoId(currentRepo.id);
      if (currentRepo.files.length > 0) {
        const firstFile = currentRepo.files[0];
        setSelectedFileId(firstFile.id);
        setOpenTabs(currentRepo.files.slice(0, Math.min(2, currentRepo.files.length)));
        setFileContent(firstFile.content);
      }
    }
  }, [repositories, initialRepoId]);

  function chooseFile(file: RepoFile) {
    setSelectedFileId(file.id);
    setFileContent(file.content);
    setOpenTabs((tabs) => (tabs.some((tab) => tab.id === file.id) ? tabs : [...tabs, file]));
  }

  function runAssistant(mode: AssistantMode) {
    setAssistantMode(mode);
    setIsGenerating(true);
    window.setTimeout(() => {
      if (mode === "fix") {
        setFileContent(fixedCode);
        setApplied(true);
      }
      setIsGenerating(false);
    }, 700);
  }

  return (
    <main className="min-h-screen px-3 py-3 text-slate-100 md:px-5 md:py-5">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-[1800px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#060914]/86 shadow-card backdrop-blur-2xl">
        <header className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rescue-cyan/30 bg-rescue-cyan/10 shadow-glow">
              <ShieldAlert className="h-5 w-5 text-rescue-cyan" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-normal text-white">CodeRescue AI</h1>
                <span className="rounded-full border border-rescue-green/30 bg-rescue-green/10 px-2.5 py-1 text-xs font-medium text-rescue-green">
                  Emergency workspace
                </span>
              </div>
              <p className="text-sm text-slate-400">Fix, edit, and deploy code from anywhere using AI.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-200 transition hover:bg-white/[0.08]">
              <Github className="h-4 w-4" />
              Connected as {userName}
            </button>
            {onBackToRepos && (
              <button
                onClick={onBackToRepos}
                className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-200 transition hover:bg-white/[0.08]"
              >
                <PanelLeft className="h-4 w-4" />
                Repos
              </button>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-200 transition hover:bg-white/[0.08]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
            <button className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg bg-rescue-cyan px-3 text-sm font-semibold text-slate-950 transition hover:bg-rescue-green">
              <Rocket className="h-4 w-4" />
              Commit and push
            </button>
          </div>
        </header>

        <section className="grid flex-1 grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_380px]">
          <aside className="glass flex min-h-[420px] flex-col border-r border-white/10 lg:min-h-0">
            <div className="border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <PanelLeft className="h-4 w-4 text-rescue-cyan" />
                  Explorer
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <GitBranch className="h-3.5 w-3.5" />
                  {selectedRepo.branch}
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {selectedRepo.name}
              </div>
              <div className="space-y-1">
                {selectedRepo.files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => chooseFile(file)}
                    className={cn(
                      "focus-ring flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition",
                      selectedFile.id === file.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/[0.05]"
                    )}
                  >
                    <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", selectedFile.id === file.id ? "rotate-90 text-white" : "text-slate-600")} />
                    <FileCode2 className="h-4 w-4 shrink-0 text-rescue-cyan" />
                    <span className="truncate">{file.path}</span>
                    {file.dirty && <CircleDot className="ml-auto h-3 w-3 shrink-0 text-rescue-pink" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="flex min-h-[680px] min-w-0 flex-col bg-[#070b14] lg:min-h-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Code2 className="h-4 w-4 text-rescue-green" />
                  Browser code editor
                </div>
                <p className="truncate text-xs text-slate-500">{selectedFile.path}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="focus-ring inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-300 hover:bg-white/[0.08]">
                  <Save className="h-4 w-4" />
                  Save
                </button>
                <button className="focus-ring inline-flex h-9 items-center gap-2 rounded-lg border border-rescue-green/30 bg-rescue-green/10 px-3 text-sm text-rescue-green hover:bg-rescue-green/15">
                  <Diff className="h-4 w-4" />
                  Diff preview
                </button>
              </div>
            </div>

            <div className="flex gap-1 overflow-x-auto border-b border-white/10 bg-black/20 px-3 pt-2">
              {openTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => chooseFile(tab)}
                  className={cn(
                    "focus-ring flex h-10 min-w-0 items-center gap-2 rounded-t-lg border border-b-0 px-3 text-sm",
                    selectedFile.id === tab.id
                      ? "border-white/10 bg-[#070b14] text-white"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  )}
                >
                  <FileCode2 className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tab.name}</span>
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1">
              <MonacoPane language={selectedFile.language} value={fileContent} onChange={setFileContent} />
            </div>

            <div className="grid border-t border-white/10 bg-black/20 md:grid-cols-3">
              {editorStats.map(([label, value, Icon]) => (
                <div key={String(label)} className="flex items-center gap-3 border-white/10 p-3 md:border-r">
                  <Icon className="h-4 w-4 text-rescue-cyan" />
                  <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm text-slate-200">
                      {label === "AI patch applied" && !applied ? "Waiting for action" : value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="glass flex min-h-[620px] flex-col border-l border-white/10 lg:min-h-0">
            <div className="border-b border-white/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Bot className="h-4 w-4 text-rescue-pink" />
                    AI rescue assistant
                  </div>
                  <p className="text-xs text-slate-500">Claude, GPT-4o, and Gemini ready</p>
                </div>
                <span className="rounded-full border border-rescue-pink/30 bg-rescue-pink/10 px-2.5 py-1 text-xs text-rescue-pink">
                  Live demo
                </span>
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto p-4">
              <section className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Deployment logs
                </label>
                <textarea
                  value={logText}
                  onChange={(event) => setLogText(event.target.value)}
                  className="focus-ring h-36 w-full resize-none rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs leading-5 text-slate-300"
                />
              </section>

              <div className="grid grid-cols-2 gap-2">
                <ActionButton icon={BrainCircuit} label="Explain Error" onClick={() => runAssistant("explain")} />
                <ActionButton icon={Wand2} label="Fix with AI" hot onClick={() => runAssistant("fix")} />
                <ActionButton icon={Zap} label="Optimize Code" onClick={() => runAssistant("optimize")} />
                <ActionButton icon={Sparkles} label="Add Feature" onClick={() => runAssistant("feature")} />
              </div>

              <section className="rounded-lg border border-rescue-cyan/20 bg-rescue-cyan/[0.06] p-4 animate-pulseBorder">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin text-rescue-cyan" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-rescue-cyan" />
                  )}
                  Analysis
                </div>
                <p className="text-sm leading-6 text-slate-300">{aiResponses[assistantMode]}</p>
              </section>

              <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white">Generated diff</h2>
                  <span className="text-xs text-rescue-green">+12 -3</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <p className="rounded bg-rescue-green/10 px-2 py-1 text-rescue-green">
                    + &quot;Content-Type&quot;: &quot;application/json&quot;
                  </p>
                  <p className="rounded bg-rescue-green/10 px-2 py-1 text-rescue-green">+ if (!tokenResponse.ok) return safe error</p>
                  <p className="rounded bg-rescue-pink/10 px-2 py-1 text-rescue-pink">- return raw token payload to browser</p>
                </div>
              </section>

              <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Feature prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  className="focus-ring h-24 w-full resize-none rounded-lg border border-white/10 bg-black/30 p-3 text-sm leading-5 text-slate-300"
                />
                <button
                  onClick={() => runAssistant("feature")}
                  className="focus-ring mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-slate-950 transition hover:bg-rescue-green"
                >
                  <Send className="h-4 w-4" />
                  Generate change
                </button>
              </section>

              <section className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <LockKeyhole className="h-4 w-4 text-rescue-amber" />
                  Commit plan
                </div>
                <p className="rounded-lg border border-white/10 bg-white/[0.04] p-3 font-mono text-xs text-slate-300">
                  fix(auth): harden GitHub OAuth callback for production deploys
                </p>
              </section>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

type ActionButtonProps = {
  icon: typeof BrainCircuit;
  label: string;
  hot?: boolean;
  onClick: () => void;
};

function ActionButton({ icon: Icon, label, hot, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "focus-ring flex min-h-12 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium transition",
        hot
          ? "border-rescue-cyan/40 bg-rescue-cyan/15 text-rescue-cyan hover:bg-rescue-cyan/20"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
