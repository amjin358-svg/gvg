#!/usr/bin/env bash
# Install / wire Google Stitch collaboration tooling for this repo.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Stitch collaboration setup"
echo "    repo: $ROOT"

ensure_path() {
  export PATH="$HOME/.local/bin:$PATH"
  if ! grep -q '\.local/bin' "$HOME/.bashrc" 2>/dev/null; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
  fi
}

install_opencode() {
  if command -v opencode >/dev/null 2>&1; then
    echo "✓ OpenCode $(opencode --version 2>/dev/null || echo present)"
    return
  fi
  echo "→ Installing OpenCode CLI (user prefix)"
  npm install -g opencode-ai --prefix "$HOME/.local"
}

install_gemini_stitch() {
  if ! command -v gemini >/dev/null 2>&1; then
    echo "→ Installing Gemini CLI"
    npm install -g @google/gemini-cli --prefix "$HOME/.local"
  else
    echo "✓ Gemini CLI $(gemini --version 2>/dev/null || true)"
  fi

  echo "→ Ensuring Gemini Stitch extension"
  gemini extensions install https://github.com/gemini-cli-extensions/stitch --auto-update || true
}

install_cursor_skills() {
  echo "→ Installing stitch-skills plugins (Cursor workspace + Claude project)"
  npx --yes plugins add google-labs-code/stitch-skills --scope workspace --target cursor -y || true
  npx --yes plugins add google-labs-code/stitch-skills --scope project --target claude-code -y || true
}

wire_api_key() {
  local key="${STITCH_API_KEY:-}"
  if [[ -z "$key" && -f "$ROOT/.env" ]]; then
    # shellcheck disable=SC1091
    set -a
    # shellcheck disable=SC1090
    source "$ROOT/.env"
    set +a
    key="${STITCH_API_KEY:-}"
  fi

  if [[ -z "$key" ]]; then
    echo ""
    echo "⚠ STITCH_API_KEY not set."
    echo "  1) Open https://stitch.withgoogle.com/ → profile → Stitch Settings → API Keys"
    echo "  2) Create a key, then either:"
    echo "       export STITCH_API_KEY=your-key"
    echo "     or copy .env.example → .env and fill STITCH_API_KEY"
    echo "  3) Re-run: bash scripts/setup-stitch.sh"
    echo ""
    echo "Config files already point at env:STITCH_API_KEY:"
    echo "  - .cursor/mcp.json"
    echo "  - .mcp.json"
    echo "  - opencode.json"
    return 0
  fi

  echo "→ Wiring Gemini Stitch extension with API key"
  local ext="$HOME/.gemini/extensions/Stitch"
  if [[ -f "$ext/gemini-extension-apikey.json" ]]; then
    # Escape sed replacement specials in key
    local escaped
    escaped=$(printf '%s' "$key" | sed -e 's/[\/&]/\\&/g')
    sed "s/YOUR_API_KEY/${escaped}/g" \
      "$ext/gemini-extension-apikey.json" > "$ext/gemini-extension.json"
    echo "✓ Gemini extension configured (API key auth)"
  else
    echo "⚠ Stitch Gemini extension missing; run gemini extensions install …"
  fi

  echo "✓ STITCH_API_KEY detected — Cursor / OpenCode MCP headers will use it from the environment"
}

verify_mcp() {
  local key="${STITCH_API_KEY:-}"
  if [[ -z "$key" ]]; then
    return 0
  fi
  echo "→ Probing Stitch MCP tools/list"
  local code
  code=$(curl -sS -o /tmp/stitch-mcp-probe.json -w "%{http_code}" \
    -X POST "https://stitch.googleapis.com/mcp" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Goog-Api-Key: ${key}" \
    -d '{"jsonrpc":"2.0","method":"tools/list","params":{},"id":1}' || true)
  if [[ "$code" == "200" ]]; then
    echo "✓ Stitch MCP responded HTTP 200"
  else
    echo "⚠ Stitch MCP probe HTTP ${code:-failed} — check API key / network"
  fi
}

ensure_path
install_opencode
install_gemini_stitch
install_cursor_skills
wire_api_key
verify_mcp

echo ""
echo "Done. Next:"
echo "  • Cursor: reload MCP / agent tools (Settings → MCP should list stitch)"
echo "  • OpenCode: opencode  (skills in .opencode/skills)"
echo "  • Gemini:   gemini → /mcp list → /stitch …"
echo "  • Docs:     docs/STITCH_COLLAB.md"
