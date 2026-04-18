import { Card } from "@/components/ui/card";
import { formatEUR } from "@/lib/format";

interface Props {
  data?: {
    income?: number;
    expenses?: number;
    savings?: number;
  };
}

const Tile = ({ label, value }: { label: string; value: unknown }) => (
  <div className="flex-1 px-5 py-4 first:pl-0 not-first:border-l border-border">
    <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
      {label}
    </div>
    <div className="text-[22px] font-semibold tabular-nums text-foreground mt-1">
      {formatEUR(value)}
    </div>
  </div>
);

export default function FinancialSummary({ data }: Props) {
  return (
    <Card className="h-full flex items-stretch px-5">
      <Tile label="Revenus / mois" value={data?.income} />
      <Tile label="Dépenses / mois" value={data?.expenses} />
      <Tile label="Épargne / mois" value={data?.savings} />
    </Card>
  );
}

FinancialSummary.colSpan = 8;
