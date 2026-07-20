export type PriceRange = { min: number; max: number };

export type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  priceLabel: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  featuredOnHome?: boolean;
};

export type Plant = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  description: string;
  careLight: string;
  careWater: string;
  priceRange: PriceRange;
  isBestseller?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
};

export type GalleryCellType = "hero" | "portrait" | "square" | "landscape" | "banner";

export type GalleryPhoto = {
  id: string;
  alt: string;
  cellType: GalleryCellType;
  goldVariant?: boolean;
};

export type PotsAccessoryGroupSlug = "pots-planters" | "soil-fertilizers" | "tools" | "decor";

export type PotsAccessoryGroup = {
  slug: PotsAccessoryGroupSlug;
  title: string;
};

export type PotsAccessoryProduct = {
  id: string;
  groupSlug: PotsAccessoryGroupSlug;
  name: string;
  description: string;
  priceLabel: string;
};
