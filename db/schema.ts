import { pgTable, text, integer, timestamp, index } from "drizzle-orm/pg-core";

export * from "../auth-schema";

export const credits = pgTable(
  "credits",
  {
    discord_id: text("discord_id").notNull().unique().primaryKey(),
    amount: integer("amount").notNull().default(900), // 15 minutes in seconds
    used: integer("used").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
);

export const stats = pgTable(
  "stats",
  {
    discord_id: text("discord_id").notNull().primaryKey().references(() => credits.discord_id),
    totalMinutesUsed: integer("total_minutes_used").notNull().default(0),
    totaltransactions: integer("total_transactions").notNull().default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
);
