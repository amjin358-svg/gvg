# Cursor agent context — GVG Global Trade OS

## Project

Global Vista Group · Global Trade OS v1.0  
Enterprise B2B/B2C international trading platform.

## Coding standards

- Strict TypeScript, no `any`
- Server Components first
- Feature-based modules under `frontend/features/`
- Atomic Design under `components/`
- Repository pattern for data access
- 100% responsive, WCAG AA, SEO ready

## Do not

- Flatten enterprise folders without updating `docs/folder-structure.md`
- Put business logic in UI atoms
- Bypass role checks when Auth is wired
