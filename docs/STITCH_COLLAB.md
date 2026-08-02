# Google Stitch AI collaboration

This repo is wired for Stitch ↔ agent collaboration (Cursor, OpenCode, Gemini CLI).

## What was installed

| Layer | Location |
| --- | --- |
| Cursor MCP | `.cursor/mcp.json` |
| Claude / generic MCP | `.mcp.json` |
| OpenCode MCP | `opencode.json` |
| Agent skills | `.agents/skills/*` |
| OpenCode skills | `.opencode/skills/*` |
| Skill source mirror | `tools/stitch-skills/` |
| Design artifacts | `.stitch/` |
| Gemini CLI extension | `~/.gemini/extensions/Stitch` |
| OpenCode CLI | `~/.local/bin/opencode` |
| Setup script | `scripts/setup-stitch.sh` |

## One-time auth

1. Open [Stitch](https://stitch.withgoogle.com/) → profile → **Stitch Settings** → **API Keys** → create a key.
2. Copy `.env.example` → `.env` and set:

```bash
STITCH_API_KEY=your-key-here
```

3. Export it in the shell (and add the same secret in Cursor Cloud / desktop env if using agents):

```bash
export STITCH_API_KEY=your-key-here
bash scripts/setup-stitch.sh
```

Never commit `.env` or paste the key into tracked JSON files.

## Daily usage

### Cursor

- Reload MCP after setting `STITCH_API_KEY`.
- Ask the agent to use Stitch skills (generate design, sync React components, extract DESIGN.md).
- Portal UI work → `gvg-os/apps/portal`; cinematic site → `gvg-os/apps/website`.

### OpenCode

```bash
export PATH="$HOME/.local/bin:$PATH"
export STITCH_API_KEY=…
opencode
```

### Gemini CLI

```bash
gemini
/mcp list
/stitch What Stitch projects do I have?
```

### Export from Stitch web UI

In Stitch: screen → **More** → **Export** → **MCP** → copy the prompt into Cursor / OpenCode / Gemini.

## Re-install / repair

```bash
bash scripts/setup-stitch.sh
```

## References

- [Stitch](https://stitch.withgoogle.com/)
- [Stitch MCP setup](https://stitch.withgoogle.com/docs/mcp/setup/)
- [stitch-skills](https://github.com/google-labs-code/stitch-skills)
- [Gemini Stitch extension](https://github.com/gemini-cli-extensions/stitch)
