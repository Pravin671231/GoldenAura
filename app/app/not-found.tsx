import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found — Golden Aura",
  description: "The page you were looking for couldn't be found.",
};

export default function NotFound() {
  return (
    <Section className="text-center">
      <Container>
        <span className="text-sm font-semibold tracking-wide text-primary uppercase">404</span>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">This Page Has Wilted Away</h1>
        <p className="mx-auto mt-4 max-w-md text-black/70">
          We couldn&apos;t find the page you were looking for. It may have been moved, or the
          link might be incorrect.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/plants" variant="outline">
            Browse Plants
          </Button>
        </div>
      </Container>
    </Section>
  );
}
