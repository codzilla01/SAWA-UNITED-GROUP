#!/usr/bin/env node
/**
 * Verifies the Vite production build in `dist/` and packages its contents
 * into a flat `sawa-united-public_html.zip` archive ready to upload & extract
 * directly inside `/domains/sawa-united.net/public_html` on Hostinger hPanel.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const outZip = path.join(rootDir, "sawa-united-public_html.zip");

const REQUIRED_FILES = [
  "index.html",
  ".htaccess",
  "contact.php",
  "config.example.php",
  "404.html",
  "projects.html",
  "privacy.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "favicon-192.png",
  "og-cover.jpg",
];

if (!fs.existsSync(distDir)) {
  console.error("Error: dist/ directory not found. Run `npm run build` first.");
  process.exit(1);
}

const missing = REQUIRED_FILES.filter((file) => !fs.existsSync(path.join(distDir, file)));
if (missing.length > 0) {
  console.error("Error: missing required deployment files in dist/:", missing.join(", "));
  process.exit(1);
}

// Ensure dist/assets contains compiled .js and .css bundles and index.html is built (not raw source)
const assetsDir = path.join(distDir, "assets");
if (!fs.existsSync(assetsDir)) {
  console.error("Error: dist/assets/ directory missing.");
  process.exit(1);
}
const assetFiles = fs.readdirSync(assetsDir);
if (!assetFiles.some((f) => f.endsWith(".js")) || !assetFiles.some((f) => f.endsWith(".css"))) {
  console.error("Error: dist/assets/ must contain compiled .js and .css bundles.");
  process.exit(1);
}
const builtHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
if (builtHtml.includes("/src/main.tsx")) {
  console.error("Error: dist/index.html still references /src/main.tsx (unbuilt source).");
  process.exit(1);
}

// Guard against accidentally bundling a live config.php with secrets
const FORBIDDEN = new Set(["config.php", ".DS_Store", "Thumbs.db"]);

function collectEntries(dir, prefix = "") {
  const items = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  const entries = [];
  for (const item of items) {
    if (FORBIDDEN.has(item.name)) continue;
    const abs = path.join(dir, item.name);
    const rel = prefix ? `${prefix}/${item.name}` : item.name;
    if (item.isDirectory()) {
      entries.push({ abs, rel: `${rel}/`, isDir: true });
      entries.push(...collectEntries(abs, rel));
    } else if (item.isFile()) {
      entries.push({ abs, rel, isDir: false });
    }
  }
  return entries;
}

// Standard IEEE 802.3 CRC-32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const year = Math.max(1980, date.getUTCFullYear());
  const dosTime =
    ((date.getUTCHours() & 0x1f) << 11) |
    ((date.getUTCMinutes() & 0x3f) << 5) |
    ((date.getUTCSeconds() >> 1) & 0x1f);
  const dosDate =
    (((year - 1980) & 0x7f) << 9) |
    (((date.getUTCMonth() + 1) & 0x0f) << 5) |
    (date.getUTCDate() & 0x1f);
  return { dosTime, dosDate };
}

function writeZip(entries, destination) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const { dosTime, dosDate } = dosDateTime(new Date());

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.rel, "utf8");
    const raw = entry.isDir ? Buffer.alloc(0) : fs.readFileSync(entry.abs);
    const checksum = entry.isDir ? 0 : crc32(raw);
    const deflated = entry.isDir ? raw : zlib.deflateRawSync(raw, { level: 9 });
    const useDeflate = !entry.isDir && deflated.length < raw.length;
    const data = useDeflate ? deflated : raw;
    const method = useDeflate ? 8 : 0;
    const extAttr = entry.isDir
      ? (((0o040755 << 16) | 0x10) >>> 0) // Unix dir 0755 + DOS dir flag
      : ((0o100644 << 16) >>> 0);         // Unix file 0644

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE((3 << 8) | 20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(method, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(raw.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(extAttr, 38);
    central.writeUInt32LE(offset, 42);

    localParts.push(local, nameBuf, data);
    centralParts.push(central, nameBuf);
    offset += local.length + nameBuf.length + data.length;
  }

  const centralBuf = Buffer.concat(centralParts);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  fs.writeFileSync(destination, Buffer.concat([...localParts, centralBuf, eocd]));
}

const entries = collectEntries(distDir);
writeZip(entries, outZip);

const sizeKb = (fs.statSync(outZip).size / 1024).toFixed(1);
const fileEntries = entries.filter((e) => !e.isDir);
console.log(`\n✓ Hostinger package ready: ${path.basename(outZip)} (${sizeKb} KB)`);
console.log(`  Target: /domains/sawa-united.net/public_html`);
console.log(`  Files (${fileEntries.length}):`);
for (const entry of fileEntries) {
  const kb = (fs.statSync(entry.abs).size / 1024).toFixed(1);
  console.log(`    - ${entry.rel.padEnd(34)} ${kb.padStart(7)} KB`);
}
