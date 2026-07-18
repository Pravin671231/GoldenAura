import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Section } from "./Section";

describe("Section", () => {
  it("renders as a semantic <section> with its children", () => {
    render(<Section>Section content</Section>);
    const section = screen.getByText("Section content");
    expect(section.tagName).toBe("SECTION");
  });
});
