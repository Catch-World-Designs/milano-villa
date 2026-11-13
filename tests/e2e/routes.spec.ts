import { expect, test } from "@playwright/test";

const routes = [
  ["home", "/", "Every room"],
  ["atelier", "/atelier", "Italian"],
  ["disciplines", "/disciplines", "Eight rooms"],
  ["project assignment", "/disciplines/project-assignment", "Eight rooms"],
  ["luxury interiors", "/disciplines/luxury-interiors", "Eight rooms"],
  ["flooring design", "/disciplines/flooring-design", "Eight rooms"],
  ["ceiling decoration", "/disciplines/ceiling-decoration", "Eight rooms"],
  ["wall and ceiling", "/disciplines/wall-and-ceiling", "Eight rooms"],
  ["lighting", "/disciplines/lighting", "Eight rooms"],
  ["doors and windows", "/disciplines/doors-and-windows", "Eight rooms"],
  ["art and accessories", "/disciplines/art-and-accessories", "Eight rooms"],
  ["commissions", "/commissions", "Rooms"],
  ["grand salon", "/commissions/grand-salon", "The Grand Salon"],
  ["marble hall", "/commissions/marble-hall", "The Marble Hall"],
  ["library", "/commissions/library-in-boiserie", "A Library in Boiserie"],
  ["piano", "/commissions/light-over-the-piano", "Light over the Piano"],
  ["dining room", "/commissions/the-dining-room", "The Dining Room"],
  ["entrance", "/commissions/the-entrance", "The Entrance"],
  ["realization", "/realization", "The realization"],
  ["contact", "/contact", "Begin with"],
] as const;

for (const [name, path, heading] of routes) {
  test(`${name} renders at its public URL`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    const publicPath = path === "/" ? "/" : `${path}/`;
    const response = await page.goto(publicPath, { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main h1").first()).toContainText(heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      path === "/" ? "http://127.0.0.1:4173/" : `http://127.0.0.1:4173${path}/`
    );
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}

test("client navigation uses clean URLs and browser history", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "The Atelier", exact: true }).first().click();
  await expect(page).toHaveURL(/\/atelier\/$/);
  await expect(page.locator("main h1").first()).toContainText("Italian");
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("main h1").first()).toContainText("Every room");
});

test("SEO support files are emitted", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap: http://127.0.0.1:4173/sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("http://127.0.0.1:4173/commissions/grand-salon/");
});

test("mobile navigation traps focus and restores it on close", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const openButton = page.getByRole("button", { name: "Open menu" });
  await openButton.click();
  const dialog = page.getByRole("dialog", { name: "Navigation" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(openButton).toBeFocused();
});

test("unconfigured contact placeholders are not published", async ({ page }) => {
  await page.goto("/contact/", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("[ADD PHONE]", { exact: true })).toHaveCount(0);
  await expect(page.getByText("[ADD NAME]", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("textbox", { name: /Full name/ })).toHaveAttribute("required", "");
  await expect(page.getByRole("textbox", { name: /Email/ })).toHaveAttribute("required", "");
  await expect(page.getByRole("textbox", { name: /rooms you have in mind/ })).toHaveAttribute(
    "required",
    ""
  );
});

