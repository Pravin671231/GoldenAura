import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesTeaser } from "./ServicesTeaser";

describe("ServicesTeaser", () => {
  it("renders all three teaser cards linking to /services", () => {
    render(<ServicesTeaser />);
    const links = screen.getAllByRole("link", { name: "Learn More" });
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/services");
    }
    expect(
      screen.getByRole("heading", { name: /landscaping & garden design/i }),
    ).toBeInTheDocument();
  });
});
