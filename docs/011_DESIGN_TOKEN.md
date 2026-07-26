# 011 — Design Tokens

Source of truth: `styles/globals.css`

## Color tokens

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#0a1628` | Primary text / dark surfaces |
| `--color-ink-soft` | `#132338` | Hover dark surfaces |
| `--color-mist` | `#eef3f6` | Soft section backgrounds |
| `--color-surface` | `#f7fafb` | App background |
| `--color-line` | `#d5dee7` | Borders / dividers |
| `--color-muted` | `#5b6b7c` | Secondary text |
| `--color-accent` | `#1a7a6d` | Primary CTA / focus |
| `--color-accent-strong` | `#146357` | CTA hover / emphasis |
| `--color-accent-soft` | `#b7e0d8` | Soft accent text on dark |
| `--color-copper` | `#b87333` | Secondary accent |

Semantic aliases:

- `--background` → `--color-surface`
- `--foreground` → `--color-ink`

## Typography tokens

| Token | Maps to |
|---|---|
| `--font-display` | Outfit |
| `--font-body` / `--font-sans` | Source Sans 3 |

## Spacing & radius guidance

- Prefer Tailwind spacing scale
- Default interactive radius: `rounded-md`
- Avoid pill-heavy UI (`rounded-full` clusters)

## Motion tokens (conceptual)

| Token | Value |
|---|---|
| Ease | `[0.22, 1, 0.36, 1]` |
| Entrance duration | `0.55s–0.7s` |
| Reduced motion | Disable transform animations |

## Do not

- Purple-on-white / purple-indigo default themes
- Cream + terracotta generic brochure look
- Glow-heavy dark neo UI as default

## Related docs

- [009_UI_DESIGN_SYSTEM.md](./009_UI_DESIGN_SYSTEM.md)
- [012_FRONTEND_STANDARD.md](./012_FRONTEND_STANDARD.md)
