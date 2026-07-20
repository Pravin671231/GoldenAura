import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CategoryProductGrid } from "./CategoryProductGrid";
import { getPlantsByCategory } from "@/data/plants";

const plants = getPlantsByCategory("indoor-foliage");

describe("CategoryProductGrid", () => {
  it("renders a product card for every plant", () => {
    render(<CategoryProductGrid plants={plants} />);
    for (const plant of plants) {
      expect(screen.getByRole("heading", { name: plant.name })).toBeInTheDocument();
    }
  });

  it("every card's Inquire CTA links to /contact", () => {
    render(<CategoryProductGrid plants={plants} />);
    for (const link of screen.getAllByRole("link", { name: "Inquire" })) {
      expect(link).toHaveAttribute("href", "/contact");
    }
  });

  it("opens the lightbox on the correct slide when a photo is clicked", async () => {
    const user = userEvent.setup();
    render(<CategoryProductGrid plants={plants} />);

    const secondPlant = plants[1];
    await user.click(
      screen.getByRole("button", { name: `View ${secondPlant.name} photo full-size` }),
    );

    expect(screen.getAllByAltText(`${secondPlant.name} photo`).length).toBeGreaterThan(0);
  });
});
