import type { Metadata } from "next";
import { Providers } from "@/features/auth/components/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeRescue AI — AI-Powered Emergency Coding Workspace",
  description:
    "Fix production bugs from anywhere using AI. CodeRescue AI gives you a browser-based IDE with GitHub sync, AI debugging, and one-click deploys.",
  keywords: "AI coding, emergency debugging, GitHub, browser IDE, production fixes",
  openGraph: {
    title: "CodeRescue AI",
    description: "AI-powered emergency coding workspace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
