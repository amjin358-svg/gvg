#!/usr/bin/env bash
# Publish GVG Global Trade OS to a NEW GitHub repository (not the weather repo).
#
# Steps for the repo owner:
#   1. Open https://github.com/new
#   2. Repository name: gvg-global-trade-os
#   3. Public, DO NOT add README / .gitignore / license
#   4. Create repository
#   5. Run this script:
#
#      ./scripts/publish-new-github-repo.sh amjin358-svg/gvg-global-trade-os
#
# Or with full URL:
#      ./scripts/publish-new-github-repo.sh https://github.com/amjin358-svg/gvg-global-trade-os.git

set -euo pipefail

TARGET="${1:-}"
if [[ -z "$TARGET" ]]; then
  echo "Usage: $0 <owner/repo|git-url>"
  echo "Example: $0 amjin358-svg/gvg-global-trade-os"
  exit 1
fi

if [[ "$TARGET" != http* && "$TARGET" != git@* ]]; then
  OWNER_REPO="$TARGET"
  TARGET="https://github.com/${TARGET}.git"
else
  OWNER_REPO=$(echo "$TARGET" | sed -E 's#https://github.com/##; s#git@github.com:##; s#\.git$##')
fi

echo "→ Target: $OWNER_REPO"
echo "→ Remote: $TARGET"

if command -v gh >/dev/null 2>&1; then
  if ! gh repo view "$OWNER_REPO" >/dev/null 2>&1; then
    echo "→ Creating empty GitHub repo via gh..."
    gh repo create "$OWNER_REPO" \
      --public \
      --description "GVG Global Trade OS — Enterprise B2B/B2C international trading platform" \
      --source=. \
      --remote=origin \
      --push
    echo "✓ Created and pushed: https://github.com/$OWNER_REPO"
    exit 0
  fi
fi

if git remote get-url origin >/dev/null 2>&1; then
  CURRENT=$(git remote get-url origin)
  if [[ "$CURRENT" == *"amjin358-svg/jin"* ]]; then
    echo "→ Removing weather-repo remote (jin)..."
    git remote remove origin
  else
    git remote set-url origin "$TARGET"
  fi
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$TARGET"
fi

BRANCH=$(git branch --show-current)
git push -u origin "$BRANCH"
echo "✓ Pushed branch '$BRANCH' to https://github.com/$OWNER_REPO"
echo "  Set default branch to main in GitHub Settings if needed."
