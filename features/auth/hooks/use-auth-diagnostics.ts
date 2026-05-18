"use client";

import { useEffect, useState } from "react";
import { fetchAuthDiagnostics, type AuthDiagnostics } from "@/features/auth/services/client";

export function useAuthDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<AuthDiagnostics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAuthDiagnostics()
      .then(setDiagnostics)
      .catch((nextError: Error) => setError(nextError.message));
  }, []);

  return { diagnostics, error };
}
