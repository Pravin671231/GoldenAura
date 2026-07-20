import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PhotoLightbox } from "./PhotoLightbox";

const slides = [
  { src: "/placeholders/plant.svg", alt: "Areca Palm photo" },
  { src: "/placeholders/plant.svg", alt: "Snake Plant photo" },
];

describe("PhotoLightbox", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <PhotoLightbox slides={slides} index={0} open={false} onClose={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the current slide's image when open", () => {
    render(<PhotoLightbox slides={slides} index={0} open onClose={() => {}} />);
    expect(screen.getAllByAltText("Areca Palm photo").length).toBeGreaterThan(0);
  });

  it("calls onClose when the close control is activated", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<PhotoLightbox slides={slides} index={0} open onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Close" }));
    // The close button waits out a fade-animation setTimeout before firing.
    await waitFor(() => expect(onClose).toHaveBeenCalledOnce());
  });

  it("exposes keyboard-operable Next/Previous controls", () => {
    render(<PhotoLightbox slides={slides} index={0} open onClose={() => {}} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous" })).toBeInTheDocument();
  });
});
