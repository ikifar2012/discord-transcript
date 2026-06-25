export const TRANSCRIPTION_USAGE = {
  includedMinutes: 180,
  usedMinutes: 0,
};

export const HOUR_PACKS = [
  {
    hours: "3 hours",
    price: "$3",
    description: "A few long voice memos",
  },
  {
    hours: "10 hours",
    price: "$9",
    description: "More voice memos",
  },
  {
    hours: "30 hours",
    price: "$24",
    description: "Regular audio-heavy use",
  },
];

export const SETUP_STEPS = [
  {
    title: "Discord sign-in",
    description: "OAuth callback is working locally.",
    done: true,
  },
  {
    title: "Use the bot",
    description: "Open Discord Tools by Matheson from Discord.",
    done: false,
  },
  {
    title: "Purchase hours",
    description: "Choose an hour pack to enable paid transcription.",
    done: false,
  },
];
