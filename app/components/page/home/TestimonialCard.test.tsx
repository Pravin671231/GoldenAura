import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "@/lib/types";

const testimonial: Testimonial = {
  id: "anitha-r",
  quote: "The healthiest plants I've bought in the city!",
  authorName: "Anitha R.",
  authorRole: "Home Gardener",
};

describe("TestimonialCard", () => {
  it("renders as a blockquote with the quote and author", () => {
    render(<TestimonialCard testimonial={testimonial} />);
    expect(screen.getByText(/the healthiest plants/i).closest("blockquote")).toBeInTheDocument();
    expect(screen.getByText("Anitha R.")).toBeInTheDocument();
    expect(screen.getByText("Home Gardener")).toBeInTheDocument();
  });
});
