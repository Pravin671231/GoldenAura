import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/", "/about", "/contact", "/plants", "/plants/indoor-foliage"];

for (const route of ROUTES) {
  test(`${route === "/" ? "home" : route} page has no critical/serious a11y violations`, async ({
    page,
  }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );
    expect(blocking).toEqual([]);
  });
}
