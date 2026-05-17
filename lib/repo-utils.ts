import type { RepoFile } from "@/lib/mock-data";

const extensionLanguage: Record<string, string> = {
  ".js": "javascript",
  ".jsx": "javascript",
  ".ts": "typescript",
  ".tsx": "typescript",
  ".json": "json",
  ".css": "css",
  ".scss": "scss",
  ".html": "html",
  ".md": "markdown",
  ".py": "python",
  ".java": "java",
  ".go": "go",
  ".rs": "rust",
  ".php": "php",
  ".rb": "ruby",
  ".yml": "yaml",
  ".yaml": "yaml",
  ".env": "shell"
};

const preferredFilePatterns = [
  "package.json",
  "next.config",
  "src/app",
  "app/",
  "src/pages",
  "pages/",
  "src/components",
  "components/",
  "src/",
  "README"
];

export function languageFromPath(path: string) {
  const fileName = path.split("/").pop() ?? path;
  if (fileName.startsWith(".env")) return "shell";
  const extension = fileName.includes(".") ? `.${fileName.split(".").pop()}` : "";
  return extensionLanguage[extension] ?? "plaintext";
}

export function isReadableCodePath(path: string) {
  const ignored = [
    "node_modules/",
    ".next/",
    "dist/",
    "build/",
    "coverage/",
    ".git/",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock"
  ];

  if (ignored.some((part) => path.includes(part))) return false;

  const fileName = path.split("/").pop() ?? path;
  if (fileName.startsWith(".env") && fileName !== ".env.example") return false;

  return Object.keys(extensionLanguage).some((extension) => fileName.endsWith(extension));
}

export function sortCodePaths(a: string, b: string) {
  const score = (path: string) => {
    const index = preferredFilePatterns.findIndex((pattern) => path.includes(pattern));
    return index === -1 ? preferredFilePatterns.length : index;
  };

  return score(a) - score(b) || a.localeCompare(b);
}

export function createRepoPreviewFiles(repoName: string, branch: string): RepoFile[] {
  return [
    {
      id: `${repoName}-readme`,
      name: "README.md",
      path: "README.md",
      language: "markdown",
      content: `# ${repoName}

This repository is connected from GitHub.

Open the workspace to load the live file tree from the ${branch} branch.`
    }
  ];
}

export function createRepoEmptyStateFile(repoName: string): RepoFile {
  return {
    id: `${repoName}-empty`,
    name: "README.md",
    path: "README.md",
    language: "markdown",
    content: `# ${repoName}

CodeRescue could not find a small readable source file in this repository.

Try another repository, or add a README / source file under src, app, pages, or components.`
  };
}
