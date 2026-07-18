import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesTeaser } from "./ServicesTeaser";

describe("ServicesTeaser", () => {
  it("renders all three teaser cards linking to /services with descriptive accessible names", () => {
    render(<ServicesTeaser />);
    const links = screen.getAllByRole("link", { name: /^learn more about /i });
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/services");
    }
    expect(
      screen.getByRole("link", { name: "Learn more about Landscaping & Garden Design" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /landscaping & garden design/i }),
    ).toBeInTheDocument();
  });
});
