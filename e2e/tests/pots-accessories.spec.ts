import { test, expect } from "@playwright/test";

test.describe("/pots-accessories", () => {
  test("lists all 4 product groups with photo, name, description, and Inquire CTA", async ({
    page,
  }) => {
    await page.goto("/pots-accessories");

    await expect(
      page.getByRole("heading", { name: "Everything to Pot, Feed & Style Your Plants" }),
    ).toBeVisible();

    for (const groupTitle of [
      "Pots & Planters",
      "Soil, Manure & Fertilizers",
      "Gardening Tools",
      "Decorative Accessories",
    ]) {
      await expect(page.getByRole("heading", { name: groupTitle })).toBeVisible();
    }

    await expect(page.getByRole("heading", { name: "Terracotta Pots" })).toBeVisible();
    await expect(page.getByText("Classic breathable clay, multiple sizes.")).toBeVisible();

    const inquireLinks = page.getByRole("link", { name: "Inquire" });
    await expect(inquireLinks.first()).toBeVisible();
    expect(await inquireLinks.count()).toBe(12);
    for (let i = 0; i < (await inquireLinks.count()); i++) {
      await expect(inquireLinks.nth(i)).toHaveAttribute("href", "/contact");
    }
  });
});
