import { describe, expect, it } from "vitest";
import { PRODUCT_GROUPS, PRODUCTS, getProductsByGroup } from "./pots-accessories";

describe("getProductsByGroup", () => {
  it("has exactly 4 product groups (FR-4.1)", () => {
    expect(PRODUCT_GROUPS).toHaveLength(4);
  });

  it("has at least one product for every group", () => {
    for (const group of PRODUCT_GROUPS) {
      expect(getProductsByGroup(group.slug).length).toBeGreaterThan(0);
    }
  });

  it("returns only products belonging to the given group", () => {
    const products = getProductsByGroup("pots-planters");
    for (const product of products) {
      expect(product.groupSlug).toBe("pots-planters");
    }
  });

  it("returns an empty array for an unknown group", () => {
    expect(getProductsByGroup("not-a-real-group")).toEqual([]);
  });

  it("has unique product ids", () => {
    const ids = PRODUCTS.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
