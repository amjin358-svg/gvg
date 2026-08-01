# 012 — Frontend Standard

## Principles

1. **Server Components first** — client components only for state, effects, browser APIs
2. **Strict TypeScript** — no `any`, prefer typed domain models in `types/`
3. **Feature modules** — UI + feature logic in `frontend/features/<name>`
4. **Atomic UI** — shared primitives in `components/`
5. **Accessible by default** — labels, focus, contrast, keyboard

## File conventions

| Type | Convention |
|---|---|
| Page | `app/<route>/page.tsx` |
| Layout | `app/**/layout.tsx` |
| Metadata | `export const metadata` / `generateMetadata` |
| Client island | `"use client"` at top |
| Hook | `hooks/useX.ts` |

## Data access from UI

- Pages call repositories/services (or fetch route handlers)
- Do not embed SQL or service-role keys in client bundles
- Mock data currently via `frontend/data/mock/*` and repositories

## Styling

- Tailwind utility classes
- Tokens from CSS variables
- `cn()` for conditional classes
- No inline style except dynamic widths/gradients when necessary

## State

- URL/search params for shareable filters
- React state for local interaction
- Prefer `useDeferredValue` / `startTransition` for responsive filtering
- Avoid premature `useMemo` / `useCallback` unless measuring or matching repo norms

## Testing expectations

- Unit: pure utils / contracts
- Component: critical interactive islands (AI panel, header menu)
- E2E: RFQ → quote → order happy path (Phase 2)

## Related docs

- [004_FOLDER_STRUCTURE.md](./004_FOLDER_STRUCTURE.md)
- [010_COMPONENT_LIBRARY.md](./010_COMPONENT_LIBRARY.md)
