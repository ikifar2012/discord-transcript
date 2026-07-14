#!/usr/bin/env sh
set -eu

required_env_vars="
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET
GROQ_API_TOKEN
TRANSCRIBE_API_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_URL
"

missing_vars=""
for var_name in $required_env_vars; do
	eval "var_value=\${$var_name-}"
	if [ -z "$var_value" ]; then
		missing_vars="$missing_vars $var_name"
	fi
done

if [ -n "$missing_vars" ]; then
	echo "Missing required environment variables:$missing_vars" >&2
	exit 1
fi

echo "Applying database migrations..."
bunx --bun drizzle-kit migrate

echo "Starting web server..."
exec bun --bun next start
