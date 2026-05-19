import type { Metadata } from "next";
import { Providers } from "@/features/auth/components/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeRescue AI - AI-Powered Emergency Coding Workspace",
  description:
    "Fix production bugs from anywhere using AI. CodeRescue AI gives you a browser-based IDE with GitHub sync, AI debugging, and one-click deploys.",
  keywords: "AI coding, emergency debugging, GitHub, browser IDE, production fixes",
  openGraph: {
    title: "CodeRescue AI",
    description: "AI-powered emergency coding workspace.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
