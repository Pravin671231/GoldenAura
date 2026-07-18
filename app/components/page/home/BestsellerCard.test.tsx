import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BestsellerCard } from "./BestsellerCard";
import type { Plant } from "@/lib/types";

const plant: Plant = {
  id: "areca-palm",
  slug: "areca-palm",
  name: "Areca Palm",
  categorySlug: "indoor-foliage",
  description: "Feathery fronds, great air-purifier for living rooms.",
  careLight: "☀ Bright Light",
  careWater: "💧 Medium Water",
  priceRange: { min: 450, max: 1200 },
  isBestseller: true,
};

describe("BestsellerCard", () => {
  it("renders the plant name, care chips, and price range", () => {
    render(<BestsellerCard plant={plant} />);
    expect(screen.getByRole("heading", { name: "Areca Palm" })).toBeInTheDocument();
    expect(screen.getByText("☀ Bright Light")).toBeInTheDocument();
    expect(screen.getByText("💧 Medium Water")).toBeInTheDocument();
    expect(screen.getByText("₹450 – ₹1,200")).toBeInTheDocument();
  });

  it("links View to the plant's category route", () => {
    render(<BestsellerCard plant={plant} />);
    expect(screen.getByRole("link", { name: "View" })).toHaveAttribute(
      "href",
      "/plants/indoor-foliage",
    );
  });
});
