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
});
