import { test, expect } from "@playwright/test";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

async function fillRequiredFields(page: import("@playwright/test").Page) {
  await page.getByLabel(/full name/i).fill("Anitha R.");
  await page.getByLabel(/phone number/i).fill("+919876543210");
  await page.getByLabel(/message/i).fill("Looking for a garden design quote.");
}

test.describe("/contact", () => {
  test("shows address, hours, and correctly targeted tel:/wa.me links", async ({ page }) => {
    await page.goto("/contact");
    const main = page.getByRole("main");

    await expect(
      main.getByText("12 Nursery Road, Green Valley, Coimbatore, Tamil Nadu 641001"),
    ).toBeVisible();
    await expect(main.getByText("Monday – Saturday")).toBeVisible();

    const phoneLink = main.getByRole("link", { name: "+91 98765 43210" });
    await expect(phoneLink).toHaveAttribute("href", "tel:+919876543210");

    const whatsappLink = main.getByRole("link", { name: "Chat with us" });
    await expect(whatsappLink).toHaveAttribute("href", /^https:\/\/wa\.me\/919876543210/);
    await expect(whatsappLink).toHaveAttribute("target", "_blank");
    await expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("pre-fills the service dropdown from a ?service= query param", async ({ page }) => {
    await page.goto("/contact?service=amc");
    await expect(page.getByLabel(/interested in/i)).toHaveValue("Plant Maintenance (AMC)");
  });

  test("shows a success state when the form backend accepts the submission", async ({ page }) => {
    await page.route(WEB3FORMS_URL, (route) =>
      route.fulfill({ status: 200, json: { success: true } }),
    );
    await page.goto("/contact");
    await fillRequiredFields(page);
    await page.getByRole("button", { name: "Send Message" }).click();

    const status = page.getByRole("status").filter({ hasText: "received your message" });
    await expect(status).toBeVisible();
  });

  test("shows an error state with fallback contact options when submission fails", async ({
    page,
  }) => {
    await page.route(WEB3FORMS_URL, (route) =>
      route.fulfill({ status: 500, json: { success: false } }),
    );
    await page.goto("/contact");
    await fillRequiredFields(page);
    await page.getByRole("button", { name: "Send Message" }).click();

    const alert = page.getByRole("alert").filter({ hasText: "Something went wrong" });
    await expect(alert).toBeVisible();
    await expect(alert.getByRole("link", { name: /call/i })).toHaveAttribute(
      "href",
      "tel:+919876543210",
    );
    await expect(alert.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/919876543210"),
    );
  });

  test("shows validation errors and never calls the form backend when required fields are empty", async ({
    page,
  }) => {
    let called = false;
    await page.route(WEB3FORMS_URL, (route) => {
      called = true;
      return route.fulfill({ status: 200, json: { success: true } });
    });
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText(/full name is required/i)).toBeVisible();
    expect(called).toBe(false);
  });
});
