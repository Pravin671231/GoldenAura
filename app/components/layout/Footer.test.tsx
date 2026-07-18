import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders a semantic footer landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the Explore and Company link groups", () => {
    render(<Footer />);
    expect(screen.getByRole("navigation", { name: "Explore" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Company" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Plant Catalog" })).toHaveAttribute("href", "/plants");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });

  it("renders a working tel: link for the visit-us phone number", () => {
    render(<Footer />);
    const phoneLink = screen.getByRole("link", { name: "+91 98765 43210" });
    expect(phoneLink).toHaveAttribute("href", "tel:+919876543210");
  });
});
