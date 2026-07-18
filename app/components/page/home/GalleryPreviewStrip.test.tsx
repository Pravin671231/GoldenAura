import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GalleryPreviewStrip } from "./GalleryPreviewStrip";
import { GALLERY_PHOTOS } from "@/data/gallery";

describe("GalleryPreviewStrip", () => {
  it("renders an image for each photo passed in", () => {
    const photos = GALLERY_PHOTOS.slice(0, 4);
    render(<GalleryPreviewStrip photos={photos} />);
    for (const photo of photos) {
      expect(screen.getByAltText(photo.alt)).toBeInTheDocument();
    }
  });
});
