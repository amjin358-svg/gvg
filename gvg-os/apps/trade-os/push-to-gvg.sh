#!/usr/bin/env bash
set -euo pipefail
REPO_URL="${1:-https://github.com/amjin358-svg/gvg.git}"
BRANCH="${2:-main}"
if [ ! -d .git ]; then
  git init
  git add -A
  git commit -m "feat: GVG Global Trade OS complete"
  git branch -M "$BRANCH"
fi
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi
git push -u origin "HEAD:$BRANCH"
echo "Pushed to $REPO_URL ($BRANCH)"
