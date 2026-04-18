import { Card } from "@/components/ui/card";
import type { Alert } from "@/lib/types";

export function AlertsPanel({ data }: { data: Alert[] }) {
  return (
    <Card className="p-6 shadow-none">
      <h3 className="text-sm font-semibold mb-4">Alertes</h3>
      <ul className="space-y-3">
        {data.map((a, i) => {
          const color = a.severity === "critical" ? "bg-danger" : "bg-warning";
          return (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-1.5 h-2 w-2 rounded-full ${color} shrink-0`} aria-hidden />
              <div className="min-w-0">
                <div className="text-sm font-medium">{a.title ?? "Alerte"}</div>
                {a.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
