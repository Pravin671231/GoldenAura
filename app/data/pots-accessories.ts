import type { PotsAccessoryGroup, PotsAccessoryProduct } from "@/lib/types";

export const PRODUCT_GROUPS: PotsAccessoryGroup[] = [
  { slug: "pots-planters", title: "Pots & Planters" },
  { slug: "soil-fertilizers", title: "Soil, Manure & Fertilizers" },
  { slug: "tools", title: "Gardening Tools" },
  { slug: "decor", title: "Decorative Accessories" },
];

export const PRODUCTS: PotsAccessoryProduct[] = [
  // Pots & Planters
  {
    id: "terracotta-pots",
    groupSlug: "pots-planters",
    name: "Terracotta Pots",
    description: "Classic breathable clay, multiple sizes.",
    priceLabel: "₹60 – ₹450",
  },
  {
    id: "ceramic-planters",
    groupSlug: "pots-planters",
    name: "Ceramic Planters",
    description: "Glazed finishes for indoor styling.",
    priceLabel: "₹250 – ₹1,500",
  },
  {
    id: "self-watering-pots",
    groupSlug: "pots-planters",
    name: "Self-Watering Pots",
    description: "Built-in reservoir — ideal for busy schedules.",
    priceLabel: "₹400 – ₹1,100",
  },
  {
    id: "hanging-planters",
    groupSlug: "pots-planters",
    name: "Hanging Planters",
    description: "Macrame & ceramic hanging styles.",
    priceLabel: "₹180 – ₹600",
  },

  // Soil, Manure & Fertilizers
  {
    id: "premium-potting-mix",
    groupSlug: "soil-fertilizers",
    name: "Premium Potting Mix",
    description: "Balanced blend for indoor plants.",
    priceLabel: "₹120 / 5kg",
  },
  {
    id: "organic-compost",
    groupSlug: "soil-fertilizers",
    name: "Organic Compost",
    description: "Vermicompost, 100% organic.",
    priceLabel: "₹90 / 5kg",
  },
  {
    id: "liquid-fertilizer",
    groupSlug: "soil-fertilizers",
    name: "Liquid Fertilizer",
    description: "Balanced NPK feed for flowering & foliage.",
    priceLabel: "₹150 – ₹350",
  },
  {
    id: "cocopeat-block",
    groupSlug: "soil-fertilizers",
    name: "Cocopeat Block",
    description: "Expandable growing medium.",
    priceLabel: "₹80",
  },

  // Gardening Tools
  {
    id: "gardening-tool-kit",
    groupSlug: "tools",
    name: "Gardening Tool Kit",
    description: "Trowel, shears, gloves & more.",
    priceLabel: "₹350 – ₹900",
  },
  {
    id: "climbing-trellis",
    groupSlug: "tools",
    name: "Climbing Trellis",
    description: "Support for climbers & creepers.",
    priceLabel: "₹250 – ₹700",
  },

  // Decorative Accessories
  {
    id: "decorative-pebbles",
    groupSlug: "decor",
    name: "Decorative Pebbles",
    description: "For top-dressing pots & terrariums.",
    priceLabel: "₹60 – ₹150",
  },
  {
    id: "wooden-plant-stands",
    groupSlug: "decor",
    name: "Wooden Plant Stands",
    description: "Tiered & single stands, multiple heights.",
    priceLabel: "₹500 – ₹2,000",
  },
];

export function getProductsByGroup(groupSlug: string): PotsAccessoryProduct[] {
  return PRODUCTS.filter((product) => product.groupSlug === groupSlug);
}
