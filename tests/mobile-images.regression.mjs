/* MAC INTERIO · Mobile image-reveal regression test.
 *
 * Guards against the "blank box where the photo should be" bug:
 * the curtain clip must run on the inner <img> (never on the observed
 * container), otherwise Chromium reports IntersectionObserver ratio 0
 * forever and the reveal deadlocks.
 *
 * Run:  npm test   (serves this folder on :8901, needs playwright browsers)
 * Fails (exit 1) on any broken assertion. Never silently passes: if no
 * browser executable is available the run errors instead of reporting OK.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PORT = 8901;
const BASE = `http://localhost:${PORT}`;
const PAGES = ["/index.html", "/about.html", "/customization.html"];
const MOBILE_WIDTHS = [360, 390, 430];

const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".mp4": "video/mp4", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain" };

function serve() {
  return new Promise((resolve) => {
    const srv = createServer(async (req, res) => {
      try {
        let urlPath = decodeURIComponent(new URL(req.url, BASE).pathname);
        if (urlPath === "/") urlPath = "/index.html";
        const file = join(ROOT, urlPath);
        if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
        const data = await readFile(file);
        res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
        res.end(data);
      } catch { res.writeHead(404); res.end("not found"); }
    });
    srv.listen(PORT, () => resolve(srv));
  });
}

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
}

/* ---- static: every local <img> src on the 3 pages must exist on disk ---- */
async function staticAssetCheck() {
  const { readFile } = await import("node:fs/promises");
  let allOk = true;
  for (const p of PAGES) {
    const html = await readFile(join(ROOT, p), "utf8");
    const srcs = [...html.matchAll(/<img[^>]+src="(\.\/[^"]+)"/g)].map((m) => m[1].replace("./", ""));
    for (const s of new Set(srcs)) {
      try { await stat(join(ROOT, s)); }
      catch { allOk = false; check(`asset exists ${p} -> ${s}`, false, "missing on disk"); }
    }
    if (allOk) check(`assets exist on disk (${p})`, true, `${new Set(srcs).size} images`);
  }
  // stylesheet + scripts referenced everywhere must exist too
  for (const f of ["css/styles.css", "js/main.js", "js/products.js"]) {
    try { await stat(join(ROOT, f)); check(`asset exists (${f})`, true); }
    catch { check(`asset exists (${f})`, false, "missing on disk"); }
  }
}

async function pageChecks(browser, pagePath, width, desktop = false) {
  const label = `${pagePath} @${width}px`;
  const ctx = await browser.newContext({
    viewport: { width, height: desktop ? 900 : 844 },
    isMobile: !desktop, hasTouch: !desktop,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
  await page.goto(BASE + pagePath, { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(1200);

  // Slow scroll top→bottom so IntersectionObserver + lazy images trigger.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 250) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, h);
  });
  // Wait for the curtain images to finish loading (lazy).
  await page.waitForFunction(() => {
    const imgs = [...document.querySelectorAll(".split-media img, .hero-media img, .page-hero .hero-media img")];
    return imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0);
  }, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(2500); // lets the reveal safety-net run if needed

  const s = await page.evaluate(() => {
    const reveals = [...document.querySelectorAll(".reveal, .img-reveal")];
    const unrevealed = reveals.filter((el) => !el.classList.contains("in"));
    const curtains = [...document.querySelectorAll(".img-reveal")].map((m) => ({
      open: m.classList.contains("in"),
      imgClip: getComputedStyle(m.querySelector("img")).clipPath,
      boxH: Math.round(m.getBoundingClientRect().height),
      natW: m.querySelector("img").naturalWidth,
    }));
    const zeroBoxes = curtains.filter((c) => c.boxH === 0).length;
    const stuckShut = curtains.filter((c) => /100%/.test(c.imgClip)).length;
    const zeroNat = curtains.filter((c) => c.natW === 0).length;
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const bar = document.querySelector(".mobile-bar");
    const barH = bar ? Math.round(bar.getBoundingClientRect().height) : 0;
    return {
      total: reveals.length, unrevealed: unrevealed.length,
      curtains: curtains.length, zeroBoxes, stuckShut, zeroNat, overflow, barH,
      bodyPad: parseFloat(getComputedStyle(document.body).paddingBottom) || 0,
    };
  });

  check(`${label}: all reveals fire`, s.unrevealed === 0, `${s.total - s.unrevealed}/${s.total} .in`);
  check(`${label}: image curtains open`, s.stuckShut === 0, `${s.curtains - s.stuckShut}/${s.curtains} open`);
  check(`${label}: curtain images loaded`, s.zeroNat === 0, `${s.curtains - s.zeroNat}/${s.curtains} naturalWidth>0`);
  check(`${label}: no zero-height image boxes`, s.zeroBoxes === 0);
  check(`${label}: no horizontal overflow`, s.overflow <= 1, `delta=${s.overflow}px`);
  if (!desktop) {
    check(`${label}: bottom bar does not cover content`, s.bodyPad >= s.barH - 1, `padding=${s.bodyPad}px bar=${s.barH}px`);
  }
  check(`${label}: no page errors`, errors.length === 0, errors[0] || "clean");
  await ctx.close();
}

const server = await serve();
/* Reuse a locally installed Chromium when the bundled headless shell is
   absent (common on dev machines / CI caches). Env override first. */
async function launchBrowser() {
  if (process.env.PLAYWRIGHT_EXE) return chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXE });
  try {
    return await chromium.launch();
  } catch (firstErr) {
    const { readdirSync, existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    const base = join(process.env.USERPROFILE || process.env.HOME || "", "AppData", "Local", "ms-playwright");
    const cands = [];
    if (existsSync(base)) {
      for (const d of readdirSync(base)) {
        cands.push(join(base, d, "chrome-win", "chrome.exe"));
        cands.push(join(base, d, "chrome-win64", "chrome.exe"));
        cands.push(join(base, d, "chrome-linux", "chrome"));
      }
    }
    for (const exe of cands) {
      if (!existsSync(exe)) continue;
      try { return await chromium.launch({ executablePath: exe }); } catch { /* try next */ }
    }
    console.error("FAIL  no usable browser for regression run — install playwright browsers, not skipping.");
    console.error(String(firstErr).split("\n").slice(0, 4).join("\n"));
    server.close();
    process.exit(2);
  }
}
const browser = await launchBrowser();
try {
  await staticAssetCheck();
  for (const w of MOBILE_WIDTHS)
    for (const p of PAGES) await pageChecks(browser, p, w);
  await pageChecks(browser, "/index.html", 1440, true); // desktop unchanged
} finally {
  await browser.close();
  server.close();
}
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
if (failed.length) { console.log("Failing checks:"); failed.forEach((f) => console.log(" - " + f.name + (f.detail ? ": " + f.detail : ""))); process.exit(1); }
