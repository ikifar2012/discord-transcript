import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";

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
      <body className="relative min-h-full bg-background text-foreground">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,#111722_0%,#0d131d_45%,#0a0f17_100%),radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.18),transparent_36%),radial-gradient(circle_at_90%_20%,rgba(251,146,60,0.14),transparent_34%)]" />
        <div className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <SiteHeader />
        </div>
        <div className="relative z-10 flex min-h-full flex-col">
          <div className="flex-1 pt-24 sm:pt-28">{children}</div>
          <div className="mx-auto w-full max-w-6xl px-4 pb-5 sm:px-6 lg:px-8">
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
