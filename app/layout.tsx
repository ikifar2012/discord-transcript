import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord Tools by Matheson | Discord voice memo transcripts",
  description: "Transcribe voice memos directly from Discord for as little as $3.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
