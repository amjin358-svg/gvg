import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = { ...process.env, GITHUB_PAGES: "true" };

function run(script) {
  const result = spawnSync("npm", ["run", script], {
    cwd: root,
    env,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

// Live GitHub Pages site = frozen V4 marketing homepage + Interactive Movie.
run("build:v4");
run("build:portal");

const siteOut = path.join(root, "apps/v4/out");
const portalOut = path.join(root, "apps/portal/out");
const nestedPortal = path.join(siteOut, "portal");
const stitchSite = path.resolve(root, "../site/public");
const nestedOs = path.join(siteOut, "os");

if (!existsSync(siteOut) || !existsSync(portalOut)) {
  console.error("Missing v4 or portal static export.");
  process.exit(1);
}

if (existsSync(nestedPortal)) {
  rmSync(nestedPortal, { recursive: true, force: true });
}
mkdirSync(nestedPortal, { recursive: true });
cpSync(portalOut, nestedPortal, { recursive: true });

if (existsSync(stitchSite)) {
  if (existsSync(nestedOs)) {
    rmSync(nestedOs, { recursive: true, force: true });
  }
  mkdirSync(nestedOs, { recursive: true });
  cpSync(stitchSite, nestedOs, { recursive: true });
  console.log("Pages bundle includes Stitch OS site at out/os");
} else {
  console.warn("Skipping Stitch OS site: site/public not found");
}

console.log("Pages bundle ready: v4/out (+ portal nested at out/portal)");
