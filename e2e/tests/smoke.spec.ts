import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Golden Aura/);
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
});
