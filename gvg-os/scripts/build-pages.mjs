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

run("build:website");
run("build:portal");

const websiteOut = path.join(root, "apps/website/out");
const portalOut = path.join(root, "apps/portal/out");
const nestedPortal = path.join(websiteOut, "portal");
const stitchSite = path.resolve(root, "../site/public");
const nestedOs = path.join(websiteOut, "os");

if (!existsSync(websiteOut) || !existsSync(portalOut)) {
  console.error("Missing website or portal static export.");
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

console.log("Pages bundle ready: website/out (+ portal nested at out/portal)");
