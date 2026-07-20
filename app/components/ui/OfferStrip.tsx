import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export type OfferStripProps = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
};

export function OfferStrip({ heading, body, ctaLabel, ctaHref, external }: OfferStripProps) {
  return (
    <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold">{heading}</h3>
        <p className="mt-1 text-black/70">{body}</p>
      </div>
      <Button
        href={ctaHref}
        variant="outline"
        size="sm"
        className="shrink-0"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {ctaLabel}
      </Button>
    </Card>
  );
}
