import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("renders its children within a centered max-width wrapper", () => {
    render(<Container>Page content</Container>);
    const container = screen.getByText("Page content");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("mx-auto");
    expect(container).toHaveClass("max-w-6xl");
  });
});
