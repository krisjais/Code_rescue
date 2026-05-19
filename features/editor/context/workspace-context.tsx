"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AssistantMode } from "@/features/ai/types";
import { demoFixedCode, generateCommitMessage } from "@/features/ai/lib/demo-ai";
import { commitFile } from "@/features/commits/services/client";
import type { Repo, RepoFile } from "@/features/github/types";
import { deploymentLog, repositories as fallbackRepositories } from "@/lib/mock-data";

type WorkspaceContextValue = {
  repositories: Repo[];
  selectedRepo: Repo;
  selectedFile: RepoFile;
  openTabs: RepoFile[];
  fileContent: string;
  logText: string;
  prompt: string;
  assistantMode: AssistantMode;
  isGenerating: boolean;
  isCommitting: boolean;
  applied: boolean;
  toast: string | null;
  toastTone: "success" | "warning";
  commitMessage: string;
  selectFile: (file: RepoFile) => void;
  setFileContent: (value: string) => void;
  setLogText: (value: string) => void;
  setPrompt: (value: string) => void;
  runAssistant: (mode: AssistantMode) => void;
  commitChanges: () => Promise<void>;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

type WorkspaceProviderProps = {
  repositories?: Repo[];
  initialRepoId?: string;
  children: React.ReactNode;
};

export function WorkspaceProvider({
  repositories = fallbackRepositories,
  initialRepoId,
  children
}: WorkspaceProviderProps) {
  const [selectedRepoId, setSelectedRepoId] = useState(initialRepoId ?? repositories[0].id);
  const selectedRepo = repositories.find((repo) => repo.id === selectedRepoId) ?? repositories[0];
  const [selectedFileId, setSelectedFileId] = useState(selectedRepo.files[0].id);
  const selectedFile = selectedRepo.files.find((file) => file.id === selectedFileId) ?? selectedRepo.files[0];
  const [openTabs, setOpenTabs] = useState<RepoFile[]>(selectedRepo.files.slice(0, 2));
  const [fileContent, setFileContent] = useState(selectedFile.content);
  const [logText, setLogText] = useState(deploymentLog);
  const [prompt, setPrompt] = useState("Fix the selected error and keep credentials server-side.");
  const [assistantMode, setAssistantMode] = useState<AssistantMode>("fix");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [applied, setApplied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastTone, setToastTone] = useState<"success" | "warning">("success");

  useEffect(() => {
    const nextRepo = repositories.find((repo) => repo.id === initialRepoId) ?? repositories[0];
    if (!nextRepo) return;

    const firstFile = nextRepo.files[0];
    setSelectedRepoId(nextRepo.id);
    setSelectedFileId(firstFile.id);
    setOpenTabs(nextRepo.files.slice(0, Math.min(2, nextRepo.files.length)));
    setFileContent(firstFile.content);
    setApplied(false);
  }, [repositories, initialRepoId]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selectFile = useCallback((file: RepoFile) => {
    setSelectedFileId(file.id);
    setFileContent(file.content);
    setOpenTabs((tabs) => (tabs.some((tab) => tab.id === file.id) ? tabs : [...tabs, file]));
  }, []);

  const runAssistant = useCallback((mode: AssistantMode) => {
    setAssistantMode(mode);
    setIsGenerating(true);

    window.setTimeout(() => {
      if (mode === "fix") {
        setFileContent((current) => (current.includes("github.com/login/oauth") ? demoFixedCode : current));
        setApplied(true);
        setToastTone("success");
        setToast("AI patch prepared for review");
      } else {
        setToastTone("success");
        setToast(`${mode === "explain" ? "Explanation" : "Suggestion"} generated`);
      }
      setIsGenerating(false);
    }, 650);
  }, []);

  const commitChanges = useCallback(async () => {
    if (isCommitting) return;

    setIsCommitting(true);

    try {
      const commitMessage = generateCommitMessage(selectedFile.path);
      const result = await commitFile(selectedRepo.id, {
        branch: selectedRepo.branch,
        filePath: selectedFile.path,
        content: fileContent,
        message: commitMessage
      });

      setToastTone("success");
      setToast(`Committed ${result.path} to ${result.branch}`);
      setApplied(false);
    } catch (error) {
      setToastTone("warning");
      setToast(error instanceof Error ? error.message : "Commit failed");
    } finally {
      setIsCommitting(false);
    }
  }, [fileContent, isCommitting, selectedFile.path, selectedRepo.branch, selectedRepo.id]);

  const value = useMemo(
    () => ({
      repositories,
      selectedRepo,
      selectedFile,
      openTabs,
      fileContent,
      logText,
      prompt,
      assistantMode,
      isGenerating,
      isCommitting,
      applied,
      toast,
      toastTone,
      commitMessage: generateCommitMessage(selectedFile.path),
      selectFile,
      setFileContent,
      setLogText,
      setPrompt,
      runAssistant,
      commitChanges
    }),
    [
      repositories,
      selectedRepo,
      selectedFile,
      openTabs,
      fileContent,
      logText,
      prompt,
      assistantMode,
      isGenerating,
      isCommitting,
      applied,
      toast,
      toastTone,
      selectFile,
      runAssistant,
      commitChanges
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return context;
}
