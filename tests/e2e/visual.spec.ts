import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });
test.setTimeout(90_000);

const pages = [
  ["home", "/"],
  ["disciplines", "/disciplines/"],
  ["contact", "/contact/"],
] as const;

const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["tablet", { width: 768, height: 1024 }],
  ["mobile", { width: 390, height: 844 }],
] as const;

async function settleImages(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
      image.loading = "eager";
    });
    const step = Math.max(window.innerHeight * 0.8, 500);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
      node.classList.add("is-revealed");
    });
    const imagesReady = Promise.all(
      Array.from(document.images).map((image) => image.decode().catch(() => undefined))
    );
    await Promise.race([
      imagesReady,
      new Promise<void>((resolve) => window.setTimeout(resolve, 10_000)),
    ]);
  });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
}

for (const [viewportName, viewport] of viewports) {
  for (const [pageName, path] of pages) {
    test(`${pageName} matches the ${viewportName} visual contract`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path, { waitUntil: "networkidle" });
      await settleImages(page);
      await expect(page).toHaveScreenshot(`${pageName}-${viewportName}.png`, {
        animations: "disabled",
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });
  }
}

