import type { Metadata } from "next";
import { Providers } from "@/features/auth/components/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeRescue AI",
  description: "Fix, edit, and deploy code from anywhere using AI."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
