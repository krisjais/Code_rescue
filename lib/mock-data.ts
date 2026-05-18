import type { Repo } from "@/features/github/types";
export type { Repo, RepoFile } from "@/features/github/types";

export const repositories: Repo[] = [
  {
    id: "rescue-web",
    name: "rescue-web",
    owner: "vishe",
    branch: "main",
    status: "failing",
    updated: "8 min ago",
    files: [
      {
        id: "auth-route",
        name: "route.ts",
        path: "app/api/auth/callback/route.ts",
        language: "typescript",
        dirty: true,
        content: `import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  const token = await tokenResponse.json();
  return NextResponse.json({ token });
}
`
      },
      {
        id: "editor",
        name: "EditorShell.tsx",
        path: "components/EditorShell.tsx",
        language: "typescript",
        content: `export function EditorShell() {
  return (
    <section className="editor">
      <MonacoEditor theme="vs-dark" />
    </section>
  );
}
`
      },
      {
        id: "env",
        name: ".env.example",
        path: ".env.example",
        language: "shell",
        content: `GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
`
      }
    ]
  },
  {
    id: "mobile-hotfix",
    name: "mobile-hotfix",
    owner: "team-rescue",
    branch: "release",
    status: "review",
    updated: "22 min ago",
    files: [
      {
        id: "navbar",
        name: "Navbar.tsx",
        path: "src/components/Navbar.tsx",
        language: "typescript",
        content: `export function Navbar() {
  return <nav>CodeRescue</nav>;
}
`
      }
    ]
  },
  {
    id: "api-gateway",
    name: "api-gateway",
    owner: "team-rescue",
    branch: "main",
    status: "healthy",
    updated: "1 hour ago",
    files: [
      {
        id: "health",
        name: "health.ts",
        path: "pages/api/health.ts",
        language: "typescript",
        content: `export default function handler(req, res) {
  res.status(200).json({ ok: true });
}
`
      }
    ]
  }
];

export const deploymentLog = `Vercel build failed
app/api/auth/callback/route.ts
TypeError: Body is unusable
  at async GET (route.ts:23:17)

Root cause hint:
GitHub OAuth token exchange requires Content-Type: application/json.
The current route also returns the raw token payload to the browser.`;
