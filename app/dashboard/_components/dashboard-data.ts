export const TRANSCRIPTION_USAGE = {
  includedMinutes: 15,
  usedMinutes: 0,
};

export const HOUR_PACKS = [
  {
    hours: "3 hours",
    price: "$3",
    description: "A few long voice memos",
    seconds: 3 * 60 * 60, // 3 hours in seconds
  },
  {
    hours: "10 hours",
    price: "$9",
    description: "More voice memos",
    seconds: 10 * 60 * 60, // 10 hours in seconds
  },
  {
    hours: "30 hours",
    price: "$24",
    description: "Regular audio-heavy use",
    seconds: 30 * 60 * 60, // 30 hours in seconds
  },
];

export const SETUP_STEPS = [
  {
    title: "Discord sign-in",
    description: "Sign in to Discord Tools by Matheson with your Discord account.",
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
