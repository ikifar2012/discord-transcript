export type HourPack = {
  id: number;
  hours: string;
  price: string;
  priceincents: number;
  description: string;
  seconds: number;
};

export const HOUR_PACKS = [
  {
    id: 1,
    hours: "1 hour",
    price: "$2",
    priceincents: 200, // 2 dollars in cents
    description: "Try it out",
    seconds: 1 * 60 * 60, // 1 hour in seconds
  },
  {
    id: 5,
    hours: "5 hours",
    price: "$5",
    priceincents: 500, // 5 dollars in cents
    description: "Regular audio use",
    seconds: 5 * 60 * 60, // 5 hours in seconds
  },
  {
    id: 10,
    hours: "10 hours",
    price: "$9",
    priceincents: 900, // 9 dollars in cents
    description: "Best value",
    seconds: 10 * 60 * 60, // 10 hours in seconds
  }
] as const satisfies readonly HourPack[];

export type HourPackName = (typeof HOUR_PACKS)[number]["hours"];
export type HourPackId = (typeof HOUR_PACKS)[number]["id"];