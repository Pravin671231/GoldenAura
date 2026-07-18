import type { Category } from "@/lib/types";

export const CATEGORIES: Category[] = [
  {
    id: "indoor-foliage",
    slug: "indoor-foliage",
    name: "Indoor & Foliage Plants",
    description: "Money Plant, Areca Palm, Philodendron",
    icon: "🌿",
    featuredOnHome: true,
  },
  {
    id: "air-purifying",
    slug: "air-purifying",
    name: "Air-Purifying Plants",
    description: "Snake Plant, Peace Lily, Spider Plant",
    icon: "🍃",
    featuredOnHome: true,
  },
  {
    id: "succulents-cacti",
    slug: "succulents-cacti",
    name: "Succulents & Cacti",
    description: "Echeveria, Jade, Haworthia",
    icon: "🌵",
    featuredOnHome: true,
  },
  {
    id: "flowering",
    slug: "flowering",
    name: "Flowering Plants",
    description: "Rose, Hibiscus, Bougainvillea",
    icon: "🌸",
    featuredOnHome: true,
  },
  {
    id: "outdoor-garden",
    slug: "outdoor-garden",
    name: "Outdoor & Garden Plants",
    description: "Hedges, ground cover, ornamental grass",
    icon: "🌳",
  },
  {
    id: "bonsai",
    slug: "bonsai",
    name: "Bonsai",
    description: "Ficus, Banyan, Juniper",
    icon: "🌲",
  },
  {
    id: "palms-tropical",
    slug: "palms-tropical",
    name: "Palms & Tropical Plants",
    description: "Areca Palm, Bamboo Palm, Banana Plant",
    icon: "🌴",
  },
  {
    id: "climbers-creepers",
    slug: "climbers-creepers",
    name: "Climbers & Creepers",
    description: "Money Plant Vine, Morning Glory, Ivy",
    icon: "🌱",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getFeaturedCategories(): Category[] {
  return CATEGORIES.filter((category) => category.featuredOnHome);
}
