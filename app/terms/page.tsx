import type { Metadata } from "next";
import { LegalPage } from "../components/legal-page";
import { TERMS_SECTIONS } from "../data/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms for using Transcribe for Discord: free transcriptions, prepaid hours, acceptable use, refunds, and your responsibilities.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="The short version: pay only for what you use, don't abuse the service, and remember automatic transcripts can make mistakes."
      sections={TERMS_SECTIONS}
    />
  );
}
