import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
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

// Live root = V4 marketing homepage. Trade OS zip restore nests at /trade-os/.
run("build:v4");
run("build:portal");
run("build:trade-os");

const siteOut = path.join(root, "apps/v4/out");
const portalOut = path.join(root, "apps/portal/out");
const tradeOsOut = path.join(root, "apps/trade-os/out");
const nestedPortal = path.join(siteOut, "portal");
const nestedTradeOs = path.join(siteOut, "trade-os");
const stitchSite = path.resolve(root, "../site/public");
const nestedOs = path.join(siteOut, "os");

if (!existsSync(siteOut) || !existsSync(portalOut) || !existsSync(tradeOsOut)) {
  console.error("Missing v4, portal, or trade-os static export.");
  process.exit(1);
}

if (existsSync(nestedPortal)) {
  rmSync(nestedPortal, { recursive: true, force: true });
}
mkdirSync(nestedPortal, { recursive: true });
cpSync(portalOut, nestedPortal, { recursive: true });

if (existsSync(nestedTradeOs)) {
  rmSync(nestedTradeOs, { recursive: true, force: true });
}
mkdirSync(nestedTradeOs, { recursive: true });
cpSync(tradeOsOut, nestedTradeOs, { recursive: true });

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

writeFileSync(
  path.join(siteOut, "versions.json"),
  JSON.stringify(
    {
      v4: "/",
      experience: "/experience/",
      portal: "/portal/",
      tradeOs: "/trade-os/",
      os: "/os/",
      pages: "https://amjin358-svg.github.io/gvg/",
    },
    null,
    2,
  ),
);

console.log(
  "Pages bundle ready: v4/out (+ portal, trade-os nested; stitch os optional)",
);
