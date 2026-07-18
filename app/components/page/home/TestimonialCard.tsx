import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/lib/types";

export type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <blockquote className="h-full">
      <Card className="flex h-full flex-col gap-4">
        <p className="text-black/80">&ldquo;{testimonial.quote}&rdquo;</p>
        <footer className="mt-auto text-sm">
          <span className="font-semibold not-italic">{testimonial.authorName}</span>
          <span className="block text-black/60">{testimonial.authorRole}</span>
        </footer>
      </Card>
    </blockquote>
  );
}
