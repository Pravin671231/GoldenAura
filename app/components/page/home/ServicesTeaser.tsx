import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const TEASERS = [
  {
    emoji: "🌳",
    name: "Landscaping & Garden Design",
    body: "Home, terrace and office garden design, planned and planted by our team.",
  },
  {
    emoji: "🩺",
    name: "Plant Doctor Consultation",
    body: "Sick or struggling plant? Get expert diagnosis and a care plan.",
  },
  {
    emoji: "🧑‍🌾",
    name: "Plant Maintenance (AMC)",
    body: "Scheduled watering, pruning and pest care for homes and offices.",
  },
];

export function ServicesTeaser() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TEASERS.map((teaser) => (
        <Card key={teaser.name} className="flex flex-col gap-3">
          <h3 className="font-semibold">
            {teaser.emoji} {teaser.name}
          </h3>
          <p className="text-black/70">{teaser.body}</p>
          <Button href="/services" variant="outline" size="sm" className="mt-auto self-start">
            Learn more about {teaser.name}
          </Button>
        </Card>
      ))}
    </div>
  );
}
