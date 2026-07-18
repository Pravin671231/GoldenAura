import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About — Golden Aura",
  description: "Learn about Golden Aura, our story, and our approach to plants and gardening.",
};

export default function About() {
  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-semibold">About Golden Aura</h1>
        <p className="mt-4 max-w-2xl text-black/70">
          This placeholder About page will be replaced with the full design in a later milestone.
        </p>
      </Container>
    </Section>
  );
}
