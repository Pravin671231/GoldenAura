import { test, expect } from "@playwright/test";

test.describe("/ (Home)", () => {
  test("renders the hero, offer strip, and all major sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Bring a Little Golden Aura Into Every Space" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "🌸 Monsoon Special" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Find the Right Plant for Your Space" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Bestselling Plants This Month" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Loved by Plant Parents Across the City" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Our Nursery & Recent Work" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ready to Green Up Your Space?" })).toBeVisible();
  });

  test("category grid links resolve to each category's /plants/[category] route", async ({
    page,
  }) => {
    await page.goto("/");

    const expectedHrefs = [
      "/plants/indoor-foliage",
      "/plants/air-purifying",
      "/plants/succulents-cacti",
      "/plants/flowering",
    ];
    for (const href of expectedHrefs) {
      await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
    }
  });

  test("gallery preview strip links to /gallery", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "View Full Gallery" })).toHaveAttribute(
      "href",
      "/gallery",
    );
  });

  test.describe("bestsellers carousel", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("Prev/Next controls are keyboard-operable and scroll the carousel", async ({ page }) => {
      await page.goto("/");
      const prev = page.getByRole("button", { name: "Previous plant" });
      const next = page.getByRole("button", { name: "Next plant" });

      await expect(prev).toBeDisabled();
      await expect(next).toBeEnabled();

      await next.focus();
      await expect(next).toBeFocused();
      await page.keyboard.press("Enter");

      await expect(prev).toBeEnabled();
    });
  });
});

test.describe("custom 404", () => {
  test("shows the wilted-away page with links back to Home and Plants", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");

    await expect(page.getByRole("heading", { name: "This Page Has Wilted Away" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
    await expect(page.getByRole("link", { name: "Browse Plants" })).toHaveAttribute(
      "href",
      "/plants",
    );
  });
});
