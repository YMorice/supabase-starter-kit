import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { FinancialSummaryData } from "@/lib/types";

const eur = (n?: number) =>
  typeof n === "number"
    ? n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
    : "—";

function Trend({ v }: { v?: number }) {
  if (v === undefined) return null;
  const Icon = v > 0 ? ArrowUp : v < 0 ? ArrowDown : Minus;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular">
      <Icon className="h-3 w-3" />
      {Math.abs(v).toFixed(1)}%
    </span>
  );
}

function Spark({ data }: { data?: number[] }) {
  if (!data || data.length < 2) return <div className="h-8" />;
  const series = data.map((value, i) => ({ i, value }));
  return (
    <div className="h-8 mt-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Tile({ label, item }: { label: string; item?: FinancialSummaryData["monthlyIncome"] }) {
  return (
    <Card className="p-5 shadow-none">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-semibold tabular tracking-tight">{eur(item?.value)}</span>
        <Trend v={item?.trend} />
      </div>
      <Spark data={item?.sparkline} />
    </Card>
  );
}

export function FinancialSummary({ data }: { data: FinancialSummaryData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Tile label="Revenus mensuels" item={data.monthlyIncome} />
      <Tile label="Dépenses mensuelles" item={data.monthlyExpenses} />
      <Tile label="Épargne totale" item={data.totalSavings} />
    </div>
  );
}
