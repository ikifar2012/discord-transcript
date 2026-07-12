# syntax=docker/dockerfile:1

FROM oven/bun:1 AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies with a persistent Bun cache for fast rebuilds
FROM base AS deps
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
# Dummy secrets so module-scope SDK clients (Stripe, Groq) can be constructed
# while `next build` collects page data. Never used to make real API calls;
# the runtime container must provide the real values.
ENV STRIPE_SECRET_KEY=sk_test_dummy_build_placeholder
ENV STRIPE_WEBHOOK_SECRET=whsec_dummy_build_placeholder
ENV GROQ_API_TOKEN=gsk_dummy_build_placeholder
ENV BETTER_AUTH_SECRET=dummy_build_placeholder
RUN bun --bun next build

# Production image: includes runtime files for migrations + next start
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ARG DATABASE_URL
ENV DATABASE_URL="$DATABASE_URL"

# Copy the entire built app so runtime always has all required files.
COPY --from=builder --chown=bun:bun /app /app
RUN chmod +x ./run.sh

USER bun

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["./run.sh"]
