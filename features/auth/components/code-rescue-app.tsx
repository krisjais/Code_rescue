"use client";

import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LandingPage } from "@/features/auth/components/landing-page";
import { useAuthDiagnostics } from "@/features/auth/hooks/use-auth-diagnostics";
import { RepositoryPicker } from "@/features/github/components/repository-picker";
import { useRepositories } from "@/features/github/hooks/use-repositories";

export function CodeRescueApp() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { diagnostics } = useAuthDiagnostics();
  const { repositories, source, isLoading, error } = useRepositories(status === "authenticated");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");

    if (errorParam) {
      setAuthError("GitHub sign in failed. Check your OAuth Client ID, Client Secret, callback URL, and Vercel env vars.");
    }
  }, []);

  if (status === "loading") {
    return <FullPageLoader label="Preparing CodeRescue AI..." />;
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
      repos={repositories}
      source={source}
      isLoading={isLoading}
      error={error}
      userName={session.user?.name ?? session.user?.email ?? "developer"}
      onChoose={(repoId) => router.push(`/workspace/${repoId}`)}
    />
  );
}

function FullPageLoader({ label }: { label: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-slate-300">
        <Loader2 className="h-5 w-5 animate-spin text-rescue-cyan" />
        {label}
      </div>
    </main>
  );
}
