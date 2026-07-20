"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type PhotoLightboxSlide = {
  src: string;
  alt: string;
};

export type PhotoLightboxProps = {
  slides: PhotoLightboxSlide[];
  index: number;
  open: boolean;
  onClose: () => void;
};

export function PhotoLightbox({ slides, index, open, onClose }: PhotoLightboxProps) {
  return <Lightbox open={open} close={onClose} index={index} slides={slides} />;
}
