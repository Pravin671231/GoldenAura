import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

const mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
}));

describe("ContactForm", () => {
  beforeEach(() => {
    Array.from(mockSearchParams.keys()).forEach((key) => mockSearchParams.delete(key));
    vi.restoreAllMocks();
  });

  it("renders all fields with 'General Inquiry' selected by default", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/interested in/i)).toHaveValue("General Inquiry");
  });

  it("pre-selects the service named by a ?service= query param", () => {
    mockSearchParams.set("service", "amc");
    render(<ContactForm />);
    expect(screen.getByLabelText(/interested in/i)).toHaveValue("Plant Maintenance (AMC)");
  });

  it("shows validation errors and does not submit when required fields are missing", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(global, "fetch");
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("shows a success state on a successful submission", async () => {
    const user = userEvent.setup();
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/full name/i), "Anitha R.");
    await user.type(screen.getByLabelText(/phone number/i), "+919876543210");
    await user.type(screen.getByLabelText(/message/i), "Looking for a garden design quote.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByRole("status")).toHaveTextContent(/received your message/i);
  });

  it("shows an error state with fallback contact options on a failed submission", async () => {
    const user = userEvent.setup();
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ success: false }),
    } as Response);
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/full name/i), "Anitha R.");
    await user.type(screen.getByLabelText(/phone number/i), "+919876543210");
    await user.type(screen.getByLabelText(/message/i), "Looking for a garden design quote.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
  });
});
