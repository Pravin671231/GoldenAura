import { test, expect, type Page } from "@playwright/test";

const ROUTES = ["/", "/about"];

async function expectSharedChrome(page: Page) {
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  const whatsapp = page.getByRole("link", { name: "Chat on WhatsApp" });
  await expect(whatsapp).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+/);

  const call = page.getByRole("link", { name: "Call Golden Aura" });
  await expect(call).toHaveAttribute("href", /^tel:\+?\d+$/);
}

const EXPECTED_TITLES: Record<string, RegExp> = {
  "/": /^Golden Aura/,
  "/about": /^About/,
};

for (const route of ROUTES) {
  test(`header, footer, and FABs render on ${route}`, async ({ page }) => {
    await page.goto(route);
    await expectSharedChrome(page);
  });

  test(`${route} defines its own <title> via the Metadata API`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveTitle(EXPECTED_TITLES[route]);
  });
}

test("different routes render different titles", async ({ page }) => {
  await page.goto("/");
  const homeTitle = await page.title();
  await page.goto("/about");
  const aboutTitle = await page.title();
  expect(homeTitle).not.toBe(aboutTitle);
});

test.describe("mobile nav collapse", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger toggles the primary nav open and closed", async ({ page }) => {
    await page.goto("/");

    // display:none while closed removes it from the a11y tree, so assert the
    // DOM attribute by id rather than via getByRole for the closed states.
    const nav = page.locator("#primary-navigation");
    const toggle = page.getByRole("button", { name: "Open menu" });

    await expect(nav).toHaveAttribute("data-state", "closed");
    await expect(page.getByRole("link", { name: "Plants" })).not.toBeVisible();

    await toggle.click();
    await expect(nav).toHaveAttribute("data-state", "open");
    await expect(page.getByRole("link", { name: "Plants" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(nav).toHaveAttribute("data-state", "closed");
  });

  test("Escape closes the open nav", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("#primary-navigation");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(nav).toHaveAttribute("data-state", "open");

    await page.keyboard.press("Escape");
    await expect(nav).toHaveAttribute("data-state", "closed");
  });
});

test.describe("desktop nav", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("primary nav is visible without opening the hamburger", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Plants" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).not.toBeVisible();
  });
});
