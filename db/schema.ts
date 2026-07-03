import { pgTable, text, integer, timestamp, index } from "drizzle-orm/pg-core";
import { user } from "../auth-schema";

export * from "../auth-schema";

export const credits = pgTable(
  "credits",
  {
    discord_id: text("discord_id").notNull().primaryKey(),
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
    discord_id: text("discord_id").notNull().unique().references(() => credits.discord_id),
    totalSecondsPurchased: integer("total_seconds_purchased").notNull().default(0),
    totalSecondsUsed: integer("total_seconds_used").notNull().default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
)
export const orders = pgTable(
  "orders",
  {
    order_id: text("order_id").notNull().unique(),
    user_id: text("user_id").notNull().references(() => user.id),
    pack_id: text("pack_id").notNull(),
    order_status: text("order_status").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  }
);