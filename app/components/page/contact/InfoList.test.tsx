import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InfoList } from "./InfoList";

describe("InfoList", () => {
  it("renders the store address", () => {
    render(<InfoList />);
    expect(
      screen.getByText("12 Nursery Road, Green Valley, Coimbatore, Tamil Nadu 641001"),
    ).toBeInTheDocument();
  });

  it("renders a tel: link for the phone number", () => {
    render(<InfoList />);
    expect(screen.getByRole("link", { name: "+91 98765 43210" })).toHaveAttribute(
      "href",
      "tel:+919876543210",
    );
  });

  it("renders a wa.me link that opens in a new tab safely", () => {
    render(<InfoList />);
    const link = screen.getByRole("link", { name: "Chat with us" });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/919876543210"));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
