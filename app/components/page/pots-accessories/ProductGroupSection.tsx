import { ProductCard } from "@/components/ui/ProductCard";
import type { PotsAccessoryProduct } from "@/lib/types";

export type ProductGroupSectionProps = {
  title: string;
  products: PotsAccessoryProduct[];
};

export function ProductGroupSection({ title, products }: ProductGroupSectionProps) {
  return (
    <div>
      <h2 className="mb-5 text-2xl font-semibold">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            imageAlt={`${product.name} photo`}
            priceLabel={product.priceLabel}
            ctaHref="/contact"
            ctaLabel="Inquire"
          />
        ))}
      </div>
    </div>
  );
}
