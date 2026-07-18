import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Plant details</Card>);
    expect(screen.getByText("Plant details")).toBeInTheDocument();
  });

  it("merges a custom className with its base styles", () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText("Content");
    expect(card).toHaveClass("custom-card");
    expect(card).toHaveClass("rounded-2xl");
  });
});
