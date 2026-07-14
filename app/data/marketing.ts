import { HOUR_PACKS } from "./prices";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const STEPS = [
  {
    title: "Sign in with Discord",
    body: "One click adds the app to your Discord account. No bot to invite, no server permissions to beg for.",
  },
  {
    title: "Transcribe any voice message",
    body: "Run the app on a voice memo wherever you chat and the transcript comes back as text in Discord.",
  },
  {
    title: "Track your usage",
    body: "Your first 5 voice messages are free. See what's left and top up with prepaid hours in the dashboard.",
  },
] as const;

export const FAQS = [
  {
    question: "What is Transcribe for Discord?",
    answer:
      "Transcribe for Discord is a Discord app that turns voice messages into text directly inside Discord, proudly built in Toronto by Matheson. You sign in with your Discord account, the app links to it, and transcripts appear right where the voice memo was sent.",
  },
  {
    question: "How much does Discord voice transcription cost?",
    answer:
      "You prepay for hours of audio: $2 for 1 hour, $5 for 5 hours, or $9 for 10 hours. There is no subscription. Pay once and use the time whenever you like.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Your first 5 voice messages are transcribed free after you sign in with Discord, no matter how long they are.",
  },
  {
    question: "Do I need to add a bot to my server?",
    answer:
      "No. The app installs to your Discord account, not to a server, so it works wherever you chat without asking a server admin to add anything.",
  },
  {
    question: "How do I turn a Discord voice message into text?",
    answer:
      "Sign in once on this site with your Discord account, then use the Transcribe app on any voice message in Discord. The transcript is posted back as text, and the audio length is deducted from your minutes.",
  },
] as const;

export const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_TITLE,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      author: {
        "@type": "Person",
        name: SITE_AUTHOR,
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Toronto",
            addressRegion: "ON",
            addressCountry: "CA",
          },
        },
      },
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      offers: HOUR_PACKS.map((pack) => ({
        "@type": "Offer",
        name: `${pack.hours} of transcription`,
        price: (pack.priceincents / 100).toFixed(2),
        priceCurrency: "USD",
        url: `${SITE_URL}/dashboard`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};
