import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroFull } from "./HeroFull";

describe("HeroFull", () => {
  it("renders the heading, lead copy, and both CTAs", () => {
    render(<HeroFull />);
    expect(
      screen.getByRole("heading", { name: "Bring a Little Golden Aura Into Every Space" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse Plants" })).toHaveAttribute("href", "/plants");
    expect(screen.getByRole("link", { name: "Get a Free Consultation" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("renders the stat highlights", () => {
    render(<HeroFull />);
    expect(screen.getByText("16+")).toBeInTheDocument();
    expect(screen.getByText("Years Growing")).toBeInTheDocument();
    expect(screen.getByText("120+")).toBeInTheDocument();
    expect(screen.getByText("4,000+")).toBeInTheDocument();
  });
});
