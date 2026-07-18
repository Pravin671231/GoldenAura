import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export type OfferStripProps = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export function OfferStrip({ heading, body, ctaLabel, ctaHref }: OfferStripProps) {
  return (
    <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold">{heading}</h3>
        <p className="mt-1 text-black/70">{body}</p>
      </div>
      <Button href={ctaHref} variant="outline" size="sm" className="shrink-0">
        {ctaLabel}
      </Button>
    </Card>
  );
}
