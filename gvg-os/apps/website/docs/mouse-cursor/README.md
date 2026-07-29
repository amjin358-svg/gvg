# Mouse Cursor Effects

CPU-first pointer trails for the Interactive Movie (`/experience`).

## Goals

- Works on devices **without a discrete GPU** (integrated graphics / software canvas)
- Feels **very smooth** via pointer lerp + capped DPR
- No WebGL dependency — Canvas 2D only

## Component

`MouseCursorTrail.tsx` (exported as `MouseMeteors` for existing imports)

## Tuning

| Knob | Default | Notes |
| --- | --- | --- |
| DPR cap | `1.25` | Keeps fill-rate low on high-DPI laptops |
| Pointer lerp | `0.22` | Smoothes jitter without laggy feel |
| Max particles | `48` | Soft cap for integrated GPUs |
| `shadowBlur` | off | Avoids expensive CPU blur paths |

## Usage

```tsx
import { MouseMeteors } from "@/components/mouse-cursor/MouseCursorTrail";

<MouseMeteors />
```

Respects `prefers-reduced-motion: reduce`.
