import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const STATS = [
  { value: "16+", label: "Years Growing" },
  { value: "120+", label: "Plant Varieties" },
  { value: "4,000+", label: "Happy Gardens" },
];

export function HeroFull() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden sm:min-h-[80vh]">
      <PlaceholderImage
        alt="Temporary illustrated placeholder of a plant nursery scene, standing in for real hero photography"
        className="absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 text-white sm:px-6 lg:px-8">
        <span className="text-sm font-semibold tracking-wide uppercase text-white/80">
          Coimbatore&apos;s Ornamental Plant Nursery
        </span>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold sm:text-5xl">
          Bring a Little Golden Aura Into Every Space
        </h1>
        <p className="mt-4 max-w-xl text-white/90">
          Hand-picked indoor, outdoor and flowering plants, styled pots, and garden design
          services — grown with care, delivered with love.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/plants">Browse Plants</Button>
          <Button href="/contact" variant="outline" className="border-white text-white">
            Get a Free Consultation
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
