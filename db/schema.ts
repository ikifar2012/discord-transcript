import { pgTable, text, integer, timestamp, index } from "drizzle-orm/pg-core";
import { user } from "../auth-schema";

export * from "../auth-schema";

export const credits = pgTable(
  "credits",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull().default(30),
    used: integer("used").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("credits_userId_idx").on(table.userId)],
);