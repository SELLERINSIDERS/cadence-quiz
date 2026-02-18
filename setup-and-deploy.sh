#!/usr/bin/env bash
# CADENCE Calm+Rest Quiz — Setup & Deploy
# Run from the quiz-app directory: bash setup-and-deploy.sh
# Requires VERCEL_TOKEN env var set (get from .env)

set -e

echo "🚀 CADENCE Quiz — Build & Deploy"
echo "================================="

# Load token from .env
VERCEL_TOKEN="${VERCEL_TOKEN:-$(grep VERCEL_TOKEN /Users/clawdbot/clawd-axel/.env | cut -d= -f2 | tr -d '\"')}"

# Build
echo "Building..."
npm run build
echo "✅ Build complete"

# Deploy
echo "Deploying to Vercel..."
npx vercel --prod --yes --token "$VERCEL_TOKEN"
echo "✅ Done! Configure quiz.evolance.com as custom domain."
