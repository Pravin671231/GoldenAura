import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FabGroup } from "./FabGroup";

describe("FabGroup", () => {
  it("renders a WhatsApp FAB pointing at wa.me", () => {
    render(<FabGroup />);
    const whatsapp = screen.getByRole("link", { name: "Chat on WhatsApp" });
    expect(whatsapp).toHaveAttribute("href", expect.stringContaining("https://wa.me/919876543210"));
    expect(whatsapp).toHaveAttribute("target", "_blank");
    expect(whatsapp).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders a call FAB pointing at a tel: link", () => {
    render(<FabGroup />);
    expect(screen.getByRole("link", { name: "Call Golden Aura" })).toHaveAttribute(
      "href",
      "tel:+919876543210",
    );
  });
});
