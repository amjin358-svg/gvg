# Separate from weather repo

This codebase must **not** live in `amjin358-svg/jin` (停班停課天氣預報).

## Create a new GitHub repository

1. Open https://github.com/new while logged in as **amjin358-svg**
2. Repository name: **`gvg-global-trade-os`**
3. Visibility: Public (or Private)
4. **Do not** initialize with README / .gitignore / license
5. Click **Create repository**

## Push this project

From a machine with your GitHub credentials:

```bash
# Option A — use the helper (recommended)
./scripts/publish-new-github-repo.sh amjin358-svg/gvg-global-trade-os

# Option B — manual
git remote remove origin   # only if origin still points to jin
git remote add origin https://github.com/amjin358-svg/gvg-global-trade-os.git
git push -u origin main
```

## Cursor Cloud Environment

After the new repo exists, create / update a Cloud Agent environment pointed at:

`github.com/amjin358-svg/gvg-global-trade-os`

Do **not** continue GVG work against `jin`.
