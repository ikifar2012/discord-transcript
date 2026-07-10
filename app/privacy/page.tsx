import type { Metadata } from "next";
import { LegalPage } from "../components/legal-page";
import { PRIVACY_SECTIONS } from "../data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Transcribe for Discord handles your data: what we collect from Discord, how transcription works, and your rights. We never store your audio or transcripts.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="The short version: we store the minimum needed to run the service, your audio and transcripts are never kept, and we never sell your data."
      sections={PRIVACY_SECTIONS}
    />
  );
}
