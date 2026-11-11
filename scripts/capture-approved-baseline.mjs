import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.BASELINE_URL ?? "http://127.0.0.1:4173";
const outputRoot = path.resolve("tests/visual-baseline/approved-prototype");

const routes = [
  ["home", "/"],
  ["atelier", "/atelier"],
  ["disciplines", "/disciplines"],
  ["discipline-project-assignment", "/disciplines/project-assignment"],
  ["discipline-luxury-interiors", "/disciplines/luxury-interiors"],
  ["discipline-flooring-design", "/disciplines/flooring-design"],
  ["discipline-ceiling-decoration", "/disciplines/ceiling-decoration"],
  ["discipline-wall-and-ceiling", "/disciplines/wall-and-ceiling"],
  ["discipline-lighting", "/disciplines/lighting"],
  ["discipline-doors-and-windows", "/disciplines/doors-and-windows"],
  ["discipline-art-and-accessories", "/disciplines/art-and-accessories"],
  ["commissions", "/commissions"],
  ["commission-grand-salon", "/commissions/grand-salon"],
  ["commission-marble-hall", "/commissions/marble-hall"],
  ["commission-library-in-boiserie", "/commissions/library-in-boiserie"],
  ["commission-light-over-the-piano", "/commissions/light-over-the-piano"],
  ["commission-the-dining-room", "/commissions/the-dining-room"],
  ["commission-the-entrance", "/commissions/the-entrance"],
  ["realization", "/realization"],
  ["contact", "/contact"],
  ["not-found", "/not-found"],
];

const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
];

async function settlePage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(window.innerHeight * 0.8, 500);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
    await Promise.race([
      Promise.all(
        Array.from(document.images, (image) => {
          if (image.complete) return Promise.resolve();
          return new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          });
        })
      ),
      new Promise((resolve) => setTimeout(resolve, 8_000)),
    ]);
  });
  await page.waitForTimeout(250);
}

await mkdir(outputRoot, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const [viewportName, viewport] of viewports) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const directory = path.join(outputRoot, viewportName);
    await mkdir(directory, { recursive: true });

    for (const [name, route] of routes) {
      const page = await context.newPage();
      const url = `${baseUrl}/#${route}`;
      await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
      await settlePage(page);
      await page.screenshot({
        path: path.join(directory, `${name}.jpg`),
        type: "jpeg",
        quality: 88,
        fullPage: true,
      });
      await page.close();
      process.stdout.write(`Captured ${viewportName}/${name}\n`);
    }

    await context.close();
  }
} finally {
  await browser.close();
}

