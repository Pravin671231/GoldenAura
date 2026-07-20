import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "./ProductCard";

describe("ProductCard", () => {
  it("renders name, description, chips, price, and CTA", () => {
    render(
      <ProductCard
        name="Areca Palm"
        description="Feathery fronds, great air-purifier for living rooms."
        imageAlt="Areca Palm photo"
        chips={["☀ Bright Light", "💧 Medium Water"]}
        priceLabel="₹450 – ₹1,200"
        ctaHref="/contact"
        ctaLabel="Inquire"
      />,
    );

    expect(screen.getByRole("heading", { name: "Areca Palm" })).toBeInTheDocument();
    expect(
      screen.getByText("Feathery fronds, great air-purifier for living rooms."),
    ).toBeInTheDocument();
    expect(screen.getByText("☀ Bright Light")).toBeInTheDocument();
    expect(screen.getByText("₹450 – ₹1,200")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Inquire" })).toHaveAttribute("href", "/contact");
  });

  it("omits the chip row when no chips are given (pots-accessories no-chip variant)", () => {
    const { container } = render(
      <ProductCard
        name="Terracotta Pots"
        imageAlt="Terracotta Pots photo"
        priceLabel="₹60 – ₹450"
        ctaHref="/contact"
        ctaLabel="Inquire"
      />,
    );
    expect(container.textContent).not.toContain("💧");
  });

  it("makes the image clickable and calls onImageClick when provided", async () => {
    const user = userEvent.setup();
    const onImageClick = vi.fn();
    render(
      <ProductCard
        name="Areca Palm"
        imageAlt="Areca Palm photo"
        priceLabel="₹450 – ₹1,200"
        ctaHref="/contact"
        ctaLabel="Inquire"
        onImageClick={onImageClick}
      />,
    );

    await user.click(screen.getByRole("button", { name: "View Areca Palm photo full-size" }));
    expect(onImageClick).toHaveBeenCalledOnce();
  });

  it("renders a static (non-interactive) image when onImageClick is not provided", () => {
    render(
      <ProductCard
        name="Areca Palm"
        imageAlt="Areca Palm photo"
        priceLabel="₹450 – ₹1,200"
        ctaHref="/contact"
        ctaLabel="Inquire"
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
