import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OfferStrip } from "./OfferStrip";

describe("OfferStrip", () => {
  it("renders the heading, body, and CTA link", () => {
    render(
      <OfferStrip
        heading="🌸 Monsoon Special"
        body="Flat 15% off Flowering & Outdoor Plants — this week only."
        ctaLabel="Shop the Offer"
        ctaHref="/plants"
      />,
    );

    expect(screen.getByRole("heading", { name: "🌸 Monsoon Special" })).toBeInTheDocument();
    expect(
      screen.getByText("Flat 15% off Flowering & Outdoor Plants — this week only."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop the Offer" })).toHaveAttribute("href", "/plants");
  });

  it("adds target/rel when the CTA is external", () => {
    render(
      <OfferStrip
        heading="Not sure what suits your space?"
        body="Send us a photo on WhatsApp."
        ctaLabel="WhatsApp Us"
        ctaHref="https://wa.me/919876543210"
        external
      />,
    );
    const link = screen.getByRole("link", { name: "WhatsApp Us" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
