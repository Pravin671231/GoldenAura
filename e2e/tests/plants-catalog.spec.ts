import { test, expect } from "@playwright/test";

const CATEGORIES = [
  "indoor-foliage",
  "air-purifying",
  "succulents-cacti",
  "flowering",
  "outdoor-garden",
  "bonsai",
  "palms-tropical",
  "climbers-creepers",
];

test.describe("/plants (hub)", () => {
  test("displays all 8 core categories as a navigable grid", async ({ page }) => {
    await page.goto("/plants");
    for (const slug of CATEGORIES) {
      await expect(page.locator(`a[href="/plants/${slug}"]`).first()).toBeVisible();
    }
  });
});

test.describe("/plants/[category]", () => {
  for (const slug of CATEGORIES) {
    test(`navigates to /plants/${slug} and lists plants with an Inquire CTA`, async ({
      page,
    }) => {
      await page.goto("/plants");
      await page.locator(`a[href="/plants/${slug}"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`/plants/${slug}`));
      await expect(page.getByRole("main")).toBeVisible();
      const inquireLinks = page.getByRole("link", { name: "Inquire" });
      await expect(inquireLinks.first()).toBeVisible();
      await expect(inquireLinks.first()).toHaveAttribute("href", "/contact");
    });
  }

  test("lightbox opens on photo click, navigates next/previous, and closes", async ({ page }) => {
    await page.goto("/plants/indoor-foliage");

    const firstPhotoButton = page.getByRole("button", { name: /view .* photo full-size/i }).first();
    await firstPhotoButton.click();

    const lightbox = page.getByRole("dialog", { name: "Lightbox" });
    await expect(lightbox).toBeVisible();

    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Previous" }).click();

    await page.getByRole("button", { name: "Close" }).click();
    await expect(lightbox).not.toBeVisible();
  });

  test("lightbox is keyboard-operable (Escape closes it)", async ({ page }) => {
    await page.goto("/plants/indoor-foliage");
    await page.getByRole("button", { name: /view .* photo full-size/i }).first().click();

    const lightbox = page.getByRole("dialog", { name: "Lightbox" });
    await expect(lightbox).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(lightbox).not.toBeVisible();
  });

  test("an unlisted category slug shows the custom 404", async ({ page }) => {
    await page.goto("/plants/not-a-real-category");
    await expect(page.getByRole("heading", { name: "This Page Has Wilted Away" })).toBeVisible();
  });
});
