import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { InfoList } from "@/components/page/contact/InfoList";
import { HoursTable } from "@/components/page/contact/HoursTable";
import { ContactForm } from "@/components/page/contact/ContactForm";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us — Golden Aura",
  description:
    "Visit our nursery, call, or send us a message — store address, hours, and a quote request form.",
};

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <SectionHead
          as="h1"
          align="left"
          className="mt-4 max-w-none"
          eyebrow="Get In Touch"
          heading="Visit, Call, or Send Us a Message"
          intro="Have a question about a plant, or want a quote for a service? Reach out any way that's convenient."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            <iframe
              src={SITE.mapsEmbedSrc}
              title="Golden Aura nursery location"
              className="h-64 w-full rounded-2xl border border-black/10"
              loading="lazy"
            />
            <Card>
              <InfoList />
            </Card>
            <Card>
              <HoursTable />
            </Card>
          </div>

          <Card>
            <Suspense fallback={<p>Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
