import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders its label", () => {
    render(<Chip>Indoor</Chip>);
    expect(screen.getByText("Indoor")).toBeInTheDocument();
  });

  it("merges a custom className with its base styles", () => {
    render(<Chip className="custom-chip">Sale</Chip>);
    const chip = screen.getByText("Sale");
    expect(chip).toHaveClass("custom-chip");
    expect(chip).toHaveClass("rounded-full");
  });
});
