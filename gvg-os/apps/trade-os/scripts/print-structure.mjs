#!/usr/bin/env node
/**
 * Prints the GVG Global Trade OS folder map for onboarding.
 */

const STRUCTURE = [
  "docs/",
  "cursor/",
  "database/",
  "frontend/",
  "backend/",
  "packages/",
  "supabase/",
  "api/",
  "components/",
  "app/",
  "lib/",
  "hooks/",
  "styles/",
  "types/",
  "public/",
  "scripts/",
  "tests/",
  "docker/",
  ".github/",
];

console.log("GVG-Global-Trade-OS/");
for (const entry of STRUCTURE) {
  console.log(`├── ${entry}`);
}
