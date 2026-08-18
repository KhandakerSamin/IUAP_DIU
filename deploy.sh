#!/usr/bin/env bash
set -euo pipefail
APP_DIR="/var/www/IUAP_DIU"
export PM2_HOME="/home/ubuntu/.pm2"

# If run as root, fix ownership and re-run as ubuntu
if [ "$(id -u)" = "0" ]; then
  chown -R ubuntu:ubuntu "$APP_DIR" "$PM2_HOME"
  exec sudo -u ubuntu PM2_HOME="$PM2_HOME" bash "$0"
fi

cd "$APP_DIR"

# 1. Pull latest changes
git fetch origin
git reset --hard origin/main

# 2. Install dependencies (prevents missing package build failures)
npm ci --prefer-offline --no-audit

# 3. Build the application
npm run build

# 4. Zero-downtime reload with PM2
pm2 startOrReload ecosystem.config.js --update-env
pm2 save

# 5. Verify service health
sleep 3
curl -sI http://localhost:3000 | head -n 5