export const LEGAL_UPDATED = "July 10, 2026";
export const CONTACT_EMAIL = "contact@mathesonsteplock.ca";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Transcribe for Discord is a voice message transcription service built and operated by Matheson in Toronto, Ontario, Canada. This policy explains what information the service collects, how it is used, and the choices you have.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "When you sign in with Discord, we receive basic profile information from your Discord account through Discord's OAuth flow:",
    ],
    bullets: [
      "Your Discord user ID, username, and display name",
      "Your email address",
      "Your avatar image",
    ],
  },
  {
    heading: "Usage and billing records",
    paragraphs: [
      "To run the service we keep records tied to your Discord ID: how many seconds of audio you have transcribed, how many free transcriptions you have used, your remaining prepaid balance, and a history of your purchases. Payments are processed by Stripe. We never see or store your card number; Stripe shares only the order details needed to credit your account.",
    ],
  },
  {
    heading: "Voice messages and transcripts",
    paragraphs: [
      "When you transcribe a voice message, the audio is read from Discord's servers and sent to Groq, our transcription provider, which converts it to text. The transcript is returned to you in Discord.",
      "We do not store your audio files or your transcripts. Once the text has been delivered, the only thing we keep is the number of seconds charged to your balance.",
    ],
  },
  {
    heading: "Cookies and sessions",
    paragraphs: [
      "We use cookies only to keep you signed in. Session records may include technical details such as your IP address and browser type for security purposes. We do not use advertising or tracking cookies.",
    ],
  },
  {
    heading: "Third-party services",
    paragraphs: ["The service relies on three providers, each of which handles your data under its own privacy policy:"],
    bullets: [
      "Discord, for sign-in and delivering voice messages and transcripts",
      "Groq, for converting audio to text",
      "Stripe, for payment processing",
    ],
  },
  {
    heading: "What we don't do",
    paragraphs: [
      "We do not sell your personal information, share it with advertisers, or use your voice messages for anything other than producing the transcript you asked for.",
    ],
  },
  {
    heading: "Data retention and deletion",
    paragraphs: [
      "Account and billing records are kept while your account is active so your balance and purchase history work correctly. If you want your account and its data deleted, email us and we will remove it, subject to records we are legally required to keep.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete it. We handle personal information in accordance with Canadian privacy law, including PIPEDA.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If we make material changes to this policy, we will update the date at the top of this page. Continued use of the service after a change means you accept the updated policy.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [`Questions about this policy or your data? Email ${CONTACT_EMAIL}.`],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Agreement",
    paragraphs: [
      "These terms govern your use of Transcribe for Discord, a service operated by Matheson in Toronto, Ontario, Canada. By signing in or using the service you agree to these terms. If you do not agree, do not use the service.",
    ],
  },
  {
    heading: "The service",
    paragraphs: [
      "Transcribe for Discord converts Discord voice messages into text. The app links to your Discord account when you sign in, and transcripts are delivered inside Discord. You must also comply with Discord's own Terms of Service while using the app.",
    ],
  },
  {
    heading: "Accounts",
    paragraphs: [
      "You sign in with your Discord account and are responsible for activity that happens through it. You must be old enough to use Discord in your country. We may suspend or close accounts that abuse the service or violate these terms.",
    ],
  },
  {
    heading: "Free transcriptions and prepaid hours",
    paragraphs: [
      "New accounts receive 5 free voice message transcriptions. After that, transcription is paid for with prepaid hour packs. Purchases are one-time payments, not subscriptions, and prepaid time does not expire.",
      "Each voice message is billed at a minimum of 10 seconds of audio, rounded up to the whole second. Balances are tied to your Discord account and cannot be transferred or redeemed for cash.",
    ],
  },
  {
    heading: "Refunds",
    paragraphs: [
      "Purchases are generally non-refundable, except where a refund is required by law. If something went wrong with a purchase or you were charged incorrectly, email us and we will make it right.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: ["You agree not to:"],
    bullets: [
      "Transcribe audio you do not have the right to process",
      "Use the service for anything illegal or to harass, defraud, or harm others",
      "Attempt to bypass billing, rate limits, or the free transcription limit",
      "Probe, disrupt, or reverse engineer the service",
    ],
  },
  {
    heading: "Transcription accuracy",
    paragraphs: [
      "Transcripts are generated automatically by a speech recognition model and may contain errors. The service is provided on an as-is basis, without warranties of any kind, and you should not rely on transcripts where accuracy is critical.",
    ],
  },
  {
    heading: "Changes to the service",
    paragraphs: [
      "We may change features or prices over time. Price changes never affect time you have already purchased.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by law, our total liability for any claim related to the service is limited to the amount you paid us in the 12 months before the claim arose. We are not liable for indirect or consequential damages, or for the acts of third-party services such as Discord, Groq, or Stripe.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable in Ontario.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "If we make material changes to these terms, we will update the date at the top of this page. Continued use of the service after a change means you accept the updated terms.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [`Questions about these terms? Email ${CONTACT_EMAIL}.`],
  },
];
