import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HoursTable } from "./HoursTable";

describe("HoursTable", () => {
  it("renders every configured hours row", () => {
    render(<HoursTable />);
    expect(screen.getByText("Monday – Saturday")).toBeInTheDocument();
    expect(screen.getByText("9:00 AM – 7:30 PM")).toBeInTheDocument();
    expect(screen.getByText("Sunday")).toBeInTheDocument();
    expect(screen.getByText("Public Holidays")).toBeInTheDocument();
  });
});
