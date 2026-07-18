import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHead } from "./SectionHead";

describe("SectionHead", () => {
  it("renders the eyebrow, heading, and intro", () => {
    render(
      <SectionHead eyebrow="Get In Touch" heading="Visit, Call, or Send Us a Message" intro="Reach out any way that's convenient." />,
    );
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Visit, Call, or Send Us a Message" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Reach out any way that's convenient.")).toBeInTheDocument();
  });

  it("renders as an h1 when requested", () => {
    render(<SectionHead heading="Contact" as="h1" />);
    const heading = screen.getByRole("heading", { name: "Contact" });
    expect(heading.tagName).toBe("H1");
  });

  it("renders as an h2 by default", () => {
    render(<SectionHead heading="Shop by Category" />);
    expect(screen.getByRole("heading", { name: "Shop by Category" }).tagName).toBe("H2");
  });

  it("omits the eyebrow and intro when not provided", () => {
    render(<SectionHead heading="Just a heading" />);
    expect(screen.getByRole("heading", { name: "Just a heading" })).toBeInTheDocument();
  });
});
