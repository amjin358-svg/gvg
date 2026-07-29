# Mouse Cursor Effects

IM-V5.0 velocity-driven meteor streaks for the Interactive Movie (`/experience`).

## Component

`MouseCursorTrail.tsx` (exported as `MouseMeteors`)

Restored to the V5 shooting-star level: multi-spawn by pointer speed, blue/violet hues, bright lead meteors, head glow.

## Usage

```tsx
import { MouseMeteors } from "@/components/mouse-cursor/MouseCursorTrail";

<MouseMeteors />
```

Respects `prefers-reduced-motion: reduce`.
