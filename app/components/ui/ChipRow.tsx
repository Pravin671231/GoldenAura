import { Chip } from "@/components/ui/Chip";

export type ChipRowProps = {
  chips: string[];
};

export function ChipRow({ chips }: ChipRowProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <Chip key={chip}>{chip}</Chip>
      ))}
    </div>
  );
}
