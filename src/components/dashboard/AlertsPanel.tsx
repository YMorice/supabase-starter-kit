import { Card } from "@/components/ui/card";

interface Alert {
  severity?: "warning" | "danger" | "info" | string;
  title?: string;
  description?: string;
}

interface Props {
  data?: { alerts?: Alert[] };
}

const dotColor = (s?: string) => {
  if (s === "danger") return "bg-destructive";
  if (s === "warning") return "bg-warning";
  return "bg-muted-foreground";
};

export default function AlertsPanel({ data }: Props) {
  const alerts = data?.alerts ?? [];
  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-3">
        Alertes
      </div>
      {alerts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
          Aucune alerte
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {alerts.map((a, i) => (
            <li key={i} className="flex gap-3">
              <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${dotColor(a.severity)}`} />
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground">{a.title ?? "Alerte"}</div>
                {a.description && (
                  <div className="text-xs text-muted-foreground mt-0.5">{a.description}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

AlertsPanel.colSpan = 5;
