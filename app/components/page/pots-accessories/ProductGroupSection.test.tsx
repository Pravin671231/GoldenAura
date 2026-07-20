import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductGroupSection } from "./ProductGroupSection";
import { getProductsByGroup } from "@/data/pots-accessories";

const products = getProductsByGroup("pots-planters");

describe("ProductGroupSection", () => {
  it("renders the group heading", () => {
    render(<ProductGroupSection title="Pots & Planters" products={products} />);
    expect(screen.getByRole("heading", { name: "Pots & Planters" })).toBeInTheDocument();
  });

  it("renders a product card (name, description, price, Inquire CTA) per product", () => {
    render(<ProductGroupSection title="Pots & Planters" products={products} />);
    for (const product of products) {
      expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(product.priceLabel)).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: "Inquire" })).toHaveLength(products.length);
    for (const link of screen.getAllByRole("link", { name: "Inquire" })) {
      expect(link).toHaveAttribute("href", "/contact");
    }
  });
});
