import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChipRow } from "./ChipRow";

describe("ChipRow", () => {
  it("renders a chip for each item", () => {
    render(<ChipRow chips={["☀ Bright Light", "💧 Medium Water"]} />);
    expect(screen.getByText("☀ Bright Light")).toBeInTheDocument();
    expect(screen.getByText("💧 Medium Water")).toBeInTheDocument();
  });

  it("renders nothing when given an empty list", () => {
    const { container } = render(<ChipRow chips={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
