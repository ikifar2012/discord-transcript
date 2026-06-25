This is a Next.js app with Better Auth and Drizzle ORM configured for PostgreSQL.

## Getting Started

Install dependencies and run the app:

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Drizzle Setup

1. Set `DATABASE_URL` in `.env`.
2. Generate migrations:

```bash
bun run db:generate
```

3. Apply migrations:

```bash
bun run db:migrate
```

4. (Optional) Open Drizzle Studio:

```bash
bun run db:studio
```

Schema lives in `db/schema.ts`, Drizzle client is exported from `db/index.ts`, and Drizzle Kit config is in `drizzle.config.ts`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
