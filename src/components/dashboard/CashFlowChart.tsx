import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface FlowEntry {
  date?: string;
  revenus?: number;
  depenses?: number;
  epargne?: number;
}

interface Props {
  data?: { flows?: FlowEntry[] };
}

export default function CashFlowChart({ data }: Props) {
  const flows = data?.flows ?? [];

  const chartData = flows.map((f) => ({
    date: f.date ?? "",
    Revenus: f.revenus ?? 0,
    Dépenses: f.depenses ?? 0,
    Épargne: f.epargne ?? 0,
  }));

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-3">
        Flux financiers
      </div>
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
          Aucune donnée de flux
        </div>
      ) : (
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="20%">
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(value)
                }
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend
                iconSize={8}
                wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
              />
              <Bar dataKey="Revenus" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Dépenses" fill="hsl(var(--destructive))" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Épargne" fill="hsl(160, 60%, 45%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}

CashFlowChart.colSpan = 12;
