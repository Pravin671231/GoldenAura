import Link from "next/link";
import type { Category } from "@/lib/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Card } from "@/components/ui/Card";

export type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/plants/${category.slug}`} className="block">
      <Card className="flex h-full flex-col gap-3 p-4">
        <PlaceholderImage alt={category.name} className="aspect-square rounded-xl" />
        <div>
          <h3 className="font-semibold">{category.name}</h3>
          <p className="mt-1 text-sm text-black/70">{category.description}</p>
        </div>
      </Card>
    </Link>
  );
}
