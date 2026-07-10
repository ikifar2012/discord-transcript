import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TITLE} | Discord voice message transcription`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  keywords: [
    "Discord voice message transcription",
    "Discord voice memo to text",
    "transcribe Discord voice messages",
    "Discord transcription app",
    "voice message to text",
  ],
  category: "productivity",
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_TITLE} | Discord voice message transcription`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} | Discord voice message transcription`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
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
