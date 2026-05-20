"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AssistantMode } from "@/features/ai/types";
import { generateCommitMessage } from "@/features/ai/lib/demo-ai";
import { commitFile } from "@/features/commits/services/client";
import type { Repo, RepoFile } from "@/features/github/types";
import { deploymentLog, repositories as fallbackRepositories } from "@/lib/mock-data";
import { generateDiff, type DiffLine } from "@/lib/repo-utils";

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
  diffMode: boolean;
  setDiffMode: (value: boolean) => void;
  saveFile: () => void;
  originalContent: string;
  diffLines: DiffLine[];
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  aiSummary: string;
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
  const [selectedFileId, setSelectedFileId] = useState("");
  const [openTabIds, setOpenTabIds] = useState<string[]>([]);
  const [fileContent, setFileContent] = useState("");
  const [logText, setLogText] = useState(deploymentLog);
  const [prompt, setPrompt] = useState("Fix the selected error and keep credentials server-side.");
  const [assistantMode, setAssistantMode] = useState<AssistantMode>("fix");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [applied, setApplied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastTone, setToastTone] = useState<"success" | "warning">("success");

  // Custom added states
  const [modifiedFiles, setModifiedFiles] = useState<Record<string, string>>({});
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, string>>({});
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [diffMode, setDiffMode] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  // Compute selectedRepo with saved (modified) files integrated
  const selectedRepo = useMemo(() => {
    const repo = repositories.find((repo) => repo.id === selectedRepoId) ?? repositories[0];
    if (!repo) return repo;
    return {
      ...repo,
      files: repo.files.map((file) => ({
        ...file,
        content: modifiedFiles[file.id] ?? file.content
      }))
    };
  }, [repositories, selectedRepoId, modifiedFiles]);

  // Compute selectedFile from selectedRepo.files
  const selectedFile = useMemo(() => {
    return selectedRepo.files.find((file) => file.id === selectedFileId) ?? selectedRepo.files[0];
  }, [selectedRepo.files, selectedFileId]);

  // Original unmodified file content for diff viewer
  const originalContent = useMemo(() => {
    const baseRepo = repositories.find((repo) => repo.id === selectedRepoId) ?? repositories[0];
    if (!baseRepo) return "";
    const baseFile = baseRepo.files.find((file) => file.id === selectedFileId) ?? baseRepo.files[0];
    return baseFile?.content ?? "";
  }, [repositories, selectedRepoId, selectedFileId]);

  // Open tabs dynamically mapped to updated files
  const openTabs = useMemo(() => {
    return openTabIds
      .map((id) => selectedRepo.files.find((f) => f.id === id))
      .filter((f): f is RepoFile => !!f);
  }, [openTabIds, selectedRepo.files]);

  // Generate dynamic diff preview
  const diffLines = useMemo(() => {
    return generateDiff(originalContent, fileContent);
  }, [originalContent, fileContent]);

  // Track initial repository load and repo swaps
  useEffect(() => {
    const nextRepo = repositories.find((repo) => repo.id === initialRepoId) ?? repositories[0];
    if (!nextRepo) return;

    const firstFile = nextRepo.files[0];
    setSelectedRepoId(nextRepo.id);
    setSelectedFileId(firstFile?.id ?? "");
    setOpenTabIds(nextRepo.files.slice(0, Math.min(2, nextRepo.files.length)).map((f) => f.id));
    setFileContent(unsavedChanges[firstFile?.id] ?? modifiedFiles[firstFile?.id] ?? firstFile?.content ?? "");
    setApplied(false);
    setDiffMode(false);
  }, [repositories, initialRepoId]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selectFile = useCallback((file: RepoFile) => {
    setSelectedFileId(file.id);
    setFileContent(unsavedChanges[file.id] ?? file.content);
    setOpenTabIds((ids) => (ids.includes(file.id) ? ids : [...ids, file.id]));
    setDiffMode(false);
  }, [unsavedChanges]);

  const handleFileContentChange = useCallback((value: string) => {
    setFileContent(value);
    setUnsavedChanges((current) => ({
      ...current,
      [selectedFileId]: value
    }));
  }, [selectedFileId]);

  const saveFile = useCallback(() => {
    if (!selectedFile) return;
    setModifiedFiles((current) => ({
      ...current,
      [selectedFile.id]: fileContent
    }));
    setUnsavedChanges((current) => {
      const next = { ...current };
      delete next[selectedFile.id];
      return next;
    });
    setToastTone("success");
    setToast(`Saved changes for ${selectedFile.name}`);
  }, [selectedFile, fileContent]);

  const runAssistant = useCallback(async (mode: AssistantMode) => {
    setAssistantMode(mode);
    setIsGenerating(true);
    setAiSummary("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode,
          log: logText,
          prompt,
          filePath: selectedFile.path,
          fileContent: fileContent,
          model: selectedModel
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error ?? "AI generation failed");
      }

      const data = await response.json();

      setAiSummary(data.summary);

      if (data.patch) {
        setFileContent(data.patch);
        setUnsavedChanges((current) => ({
          ...current,
          [selectedFile.id]: data.patch
        }));
        setApplied(true);
      }

      setToastTone("success");
      setToast("AI plan generated successfully");
    } catch (error) {
      setToastTone("warning");
      setToast(error instanceof Error ? error.message : "AI generation failed");
    } finally {
      setIsGenerating(false);
    }
  }, [logText, prompt, selectedFile, fileContent, selectedModel]);

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

      // Clear the saved modification since it's pushed to Git
      setModifiedFiles((current) => {
        const next = { ...current };
        delete next[selectedFile.id];
        return next;
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
  }, [fileContent, isCommitting, selectedFile, selectedRepo]);

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
      commitMessage: generateCommitMessage(selectedFile?.path ?? ""),
      selectFile,
      setFileContent: handleFileContentChange,
      setLogText,
      setPrompt,
      runAssistant,
      commitChanges,
      diffMode,
      setDiffMode,
      saveFile,
      originalContent,
      diffLines,
      selectedModel,
      setSelectedModel,
      aiSummary
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
      handleFileContentChange,
      runAssistant,
      commitChanges,
      diffMode,
      saveFile,
      originalContent,
      diffLines,
      selectedModel,
      aiSummary
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return context;
}

