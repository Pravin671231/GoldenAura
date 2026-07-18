import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders the wilted-away heading with links back to Home and Plants", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: "This Page Has Wilted Away" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Browse Plants" })).toHaveAttribute(
      "href",
      "/plants",
    );
  });
});
