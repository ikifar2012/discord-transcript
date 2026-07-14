#!/usr/bin/bash

cd /app
echo "Applying database migrations..."
bunx --bun drizzle-kit migrate

echo "Starting web server..."
exec bun --bun next start
