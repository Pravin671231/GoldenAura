import { describe, expect, it } from "vitest";
import { PLANTS, getBestsellers, getPlantsByCategory } from "./plants";
import { CATEGORIES } from "./categories";

describe("getPlantsByCategory", () => {
  it("returns only plants belonging to the given category", () => {
    const plants = getPlantsByCategory("indoor-foliage");
    expect(plants.length).toBeGreaterThan(0);
    for (const plant of plants) {
      expect(plant.categorySlug).toBe("indoor-foliage");
    }
  });

  it("returns an empty array for a category with no plants", () => {
    expect(getPlantsByCategory("not-a-real-category")).toEqual([]);
  });

  it("has at least one plant for every core category", () => {
    for (const category of CATEGORIES) {
      expect(getPlantsByCategory(category.slug).length).toBeGreaterThan(0);
    }
  });
});

describe("getBestsellers", () => {
  it("returns only plants flagged isBestseller", () => {
    const bestsellers = getBestsellers();
    expect(bestsellers.length).toBeGreaterThan(0);
    for (const plant of bestsellers) {
      expect(plant.isBestseller).toBe(true);
    }
  });
});

describe("PLANTS", () => {
  it("has unique slugs across the whole catalog", () => {
    const slugs = PLANTS.map((plant) => plant.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
