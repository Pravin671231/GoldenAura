import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CategoryCard } from "./CategoryCard";
import type { Category } from "@/lib/types";

const category: Category = {
  id: "indoor-foliage",
  slug: "indoor-foliage",
  name: "Indoor & Foliage Plants",
  description: "Money Plant, Areca Palm, Philodendron",
  icon: "🌿",
  featuredOnHome: true,
};

describe("CategoryCard", () => {
  it("links to the category's plants route", () => {
    render(<CategoryCard category={category} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/plants/indoor-foliage");
  });

  it("renders the category name and description", () => {
    render(<CategoryCard category={category} />);
    expect(screen.getByRole("heading", { name: "Indoor & Foliage Plants" })).toBeInTheDocument();
    expect(screen.getByText("Money Plant, Areca Palm, Philodendron")).toBeInTheDocument();
  });
});
