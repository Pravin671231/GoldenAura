import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlaceholderImage } from "./PlaceholderImage";

describe("PlaceholderImage", () => {
  it("renders an image with the given alt text", () => {
    render(<PlaceholderImage alt="Areca Palm photo" />);
    expect(screen.getByAltText("Areca Palm photo")).toBeInTheDocument();
  });

  it("applies a gold tint overlay when requested", () => {
    const { container } = render(<PlaceholderImage alt="Nursery photo" variant="gold" />);
    expect(container.querySelector(".bg-accent\\/15")).toBeInTheDocument();
  });
});
