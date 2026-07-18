import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders semantic header/nav landmarks with all primary links", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav).toBeInTheDocument();

    for (const label of [
      "Home",
      "About",
      "Plants",
      "Pots & Accessories",
      "Services",
      "Care Guide",
      "Gallery",
      "FAQ",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact");
  });

  it("starts collapsed with the toggle closed", () => {
    render(<Header />);
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveAttribute(
      "data-state",
      "closed",
    );
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("opens the mobile nav when the hamburger is activated via keyboard", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    toggle.focus();
    expect(toggle).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveAttribute(
      "data-state",
      "open",
    );
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes the mobile nav when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveAttribute(
      "data-state",
      "open",
    );

    await user.keyboard("{Escape}");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveAttribute(
      "data-state",
      "closed",
    );
  });

  it("closes the mobile nav after a link is activated", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("link", { name: "About" }));

    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveAttribute(
      "data-state",
      "closed",
    );
  });
});
