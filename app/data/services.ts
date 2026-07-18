import type { Service } from "@/lib/types";

export const SERVICES: Service[] = [
  {
    id: "landscaping",
    slug: "landscaping",
    name: "Landscaping & Garden Design",
    description:
      "Full design and setup for home, terrace, and office gardens — from concept sketch to planting day.",
    icon: "🌳",
    priceLabel: "Starting ₹5,000",
  },
  {
    id: "amc",
    slug: "amc",
    name: "Plant Maintenance (AMC)",
    description:
      "Scheduled watering, pruning, and pest control on a monthly or quarterly contract — for homes and offices.",
    icon: "🧑‍🌾",
    priceLabel: "From ₹800/month",
  },
  {
    id: "consultation",
    slug: "consultation",
    name: "Plant Doctor / Consultation",
    description:
      "Bring in (or WhatsApp a photo of) a struggling plant — we'll diagnose the issue and give you a care plan.",
    icon: "🩺",
    priceLabel: "₹150 / visit",
  },
  {
    id: "repotting",
    slug: "repotting",
    name: "Repotting & Potting Service",
    description:
      "Bring your plant and new pot — our team repots it correctly, on the spot or by appointment.",
    icon: "🪴",
    priceLabel: "From ₹100",
  },
  {
    id: "delivery",
    slug: "delivery",
    name: "Delivery & Installation",
    description:
      "Same-city delivery and on-site placement for larger plants, planters, and landscaping materials.",
    icon: "🚚",
    priceLabel: "From ₹99",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
