import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BestsellersCarousel } from "./BestsellersCarousel";
import { PLANTS } from "@/data/plants";

describe("BestsellersCarousel", () => {
  it("renders a card for every plant with Prev/Next controls", () => {
    render(<BestsellersCarousel plants={PLANTS} />);

    for (const plant of PLANTS) {
      expect(screen.getByRole("heading", { name: plant.name })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: "Previous plant" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next plant" })).toBeInTheDocument();
  });
});
