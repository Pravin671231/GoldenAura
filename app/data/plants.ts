import type { Plant } from "@/lib/types";

// Seed data: only the Home page's bestsellers for now. The full 8-category
// catalog is populated in the M4.4 (feat/plants-catalog) branch.
export const PLANTS: Plant[] = [
  {
    id: "areca-palm",
    slug: "areca-palm",
    name: "Areca Palm",
    categorySlug: "indoor-foliage",
    description: "Feathery fronds, great air-purifier for living rooms.",
    careLight: "☀ Bright Light",
    careWater: "💧 Medium Water",
    priceRange: { min: 450, max: 1200 },
    isBestseller: true,
  },
  {
    id: "snake-plant",
    slug: "snake-plant",
    name: "Snake Plant",
    categorySlug: "air-purifying",
    description: "Hardy, low-light air purifier — nearly impossible to kill.",
    careLight: "🌥 Low Light",
    careWater: "💧 Low Water",
    priceRange: { min: 250, max: 600 },
    isBestseller: true,
  },
  {
    id: "jade-plant",
    slug: "jade-plant",
    name: "Jade Plant",
    categorySlug: "succulents-cacti",
    description: "Glossy, coin-shaped leaves — a classic easy-care succulent.",
    careLight: "☀ Bright Light",
    careWater: "💧 Low Water",
    priceRange: { min: 180, max: 400 },
    isBestseller: true,
  },
  {
    id: "hibiscus",
    slug: "hibiscus",
    name: "Hibiscus",
    categorySlug: "flowering",
    description: "Bold, showy blooms that flower nearly year-round.",
    careLight: "☀ Full Sun",
    careWater: "💧 Medium Water",
    priceRange: { min: 150, max: 350 },
    isBestseller: true,
  },
];

export function getBestsellers(): Plant[] {
  return PLANTS.filter((plant) => plant.isBestseller);
}
