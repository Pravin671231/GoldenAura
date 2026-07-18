import { describe, expect, it } from "vitest";
import { contactFormSchema } from "./contact-schema";

const validPayload = {
  name: "Anitha R.",
  phone: "+91 98765 43210",
  email: "",
  service: "",
  message: "I'd like a quote for garden design.",
};

describe("contactFormSchema", () => {
  it("accepts a fully valid payload with an empty optional email", () => {
    const result = contactFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("accepts a valid email when provided", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, email: "anitha@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejects a malformed email", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("requires a non-empty name", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, name: "  " });
    expect(result.success).toBe(false);
  });

  it("requires a plausible phone number", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, phone: "123" });
    expect(result.success).toBe(false);
  });

  it("requires a message of at least 10 characters", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, message: "Hi" });
    expect(result.success).toBe(false);
  });

  it("allows service to be omitted", () => {
    const { service, ...rest } = validPayload;
    void service;
    const result = contactFormSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });
});
