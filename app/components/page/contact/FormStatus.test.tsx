import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormStatus } from "./FormStatus";

describe("FormStatus", () => {
  it("renders nothing when idle", () => {
    const { container } = render(<FormStatus state="idle" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a submitting message", () => {
    render(<FormStatus state="submitting" />);
    expect(screen.getByRole("status")).toHaveTextContent("Sending your message");
  });

  it("renders a success message", () => {
    render(<FormStatus state="success" />);
    expect(screen.getByRole("status")).toHaveTextContent(/received your message/i);
  });

  it("renders an error message with fallback phone/WhatsApp options", () => {
    render(<FormStatus state="error" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/something went wrong/i);
    expect(screen.getByRole("link", { name: /call/i })).toHaveAttribute(
      "href",
      "tel:+919876543210",
    );
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/919876543210"),
    );
  });
});
