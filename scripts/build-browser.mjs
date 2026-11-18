#!/usr/bin/env node
/**
 * Builds the standalone browser-ready site (`index.html` + `assets/app.js` + `assets/style.css` + logos)
 * using classic `<script defer>` and relative `./assets/*` paths so it opens directly in any browser
 * AND works out-of-the-box on Hostinger `/domains/sawa-united.net/public_html` with zero build step.
 *
 * Outputs:
 *   1. `dist/` — clean Hostinger `public_html` directory (only production files, zero source/dev files)
 *   2. Repository root `index.html` & `assets/` — synced so uploading/cloning the repo works directly too
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const rootAssetsDir = path.join(rootDir, "assets");

const ROOT_STATIC_FILES = [
  ".htaccess",
  "404.html",
  "config.example.php",
  "contact.php",
  "favicon-192.png",
  "og-cover.jpg",
  "privacy.html",
  "projects.html",
  "robots.txt",
  "site.webmanifest",
  "sitemap.xml",
];

await build({ configFile: path.join(rootDir, "vite.config.ts") });

const appJsPath = path.join(distDir, "assets", "app.js");
const styleCssPath = path.join(distDir, "assets", "style.css");

if (!fs.existsSync(appJsPath) || !fs.existsSync(styleCssPath)) {
  console.error("Error: expected dist/assets/app.js and dist/assets/style.css after Vite build.");
  process.exit(1);
}

// Compute short content hash for automatic browser cache busting on updates
const hash = crypto
  .createHash("sha256")
  .update(fs.readFileSync(appJsPath))
  .update(fs.readFileSync(styleCssPath))
  .digest("hex")
  .slice(0, 8);

const template = fs.readFileSync(path.join(rootDir, "src", "template.html"), "utf8");
const renderedHtml = template
  .replace(
    "<!-- SAWA_STYLES -->",
    `<link rel="stylesheet" href="./assets/style.css?v=${hash}" />`,
  )
  .replace(
    "<!-- SAWA_SCRIPTS -->",
    `<script defer data-cfasync="false" src="./assets/app.js?v=${hash}"></script>`,
  );

fs.writeFileSync(path.join(distDir, "index.html"), renderedHtml, "utf8");

// Copy static Hostinger root files into dist/
for (const file of ROOT_STATIC_FILES) {
  const src = path.join(rootDir, file);
  if (!fs.existsSync(src)) {
    console.error(`Error: missing root static file: ${file}`);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(distDir, file));
}

// Sync compiled index.html and assets/ to repository root so the repo itself is 100% browser-ready
fs.writeFileSync(path.join(rootDir, "index.html"), renderedHtml, "utf8");
fs.rmSync(rootAssetsDir, { recursive: true, force: true });
fs.mkdirSync(rootAssetsDir, { recursive: true });
for (const file of fs.readdirSync(path.join(distDir, "assets"))) {
  fs.copyFileSync(
    path.join(distDir, "assets", file),
    path.join(rootAssetsDir, file),
  );
}

console.log(`\n✓ Browser-ready build complete (version v=${hash})`);
console.log(`  Synced root index.html + assets/ (${fs.readdirSync(rootAssetsDir).join(", ")})`);
