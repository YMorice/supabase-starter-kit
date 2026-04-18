import { Card } from "@/components/ui/card";
import { AlertTriangle, Zap, Info, CheckCircle2 } from "lucide-react";
import { useDetailPanel } from "@/lib/detailPanel";

interface Alert {
  severity?: "warning" | "danger" | "info" | string;
  title?: string;
  description?: string;
}

interface Props {
  data?: { alerts?: Alert[] };
}

const severityStyles = (s?: string) => {
  if (s === "danger")
    return {
      border: "border-l-destructive",
      icon: AlertTriangle,
      iconColor: "text-destructive",
    };
  if (s === "warning")
    return {
      border: "border-l-warning",
      icon: Zap,
      iconColor: "text-warning",
    };
  return {
    border: "border-l-muted-foreground/40",
    icon: Info,
    iconColor: "text-muted-foreground",
  };
};

export default function AlertsPanel({ data }: Props) {
  const alerts = data?.alerts ?? [];
  const openDetail = useDetailPanel((s) => s.openDetail);

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-3">
        Alertes
      </div>
      {alerts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          Aucun signal d'attention détecté
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {alerts.map((a, i) => {
            const s = severityStyles(a.severity);
            const Icon = s.icon;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() =>
                    openDetail({
                      source: "alert",
                      severity: a.severity,
                      title: a.title ?? "Alerte",
                      description: a.description,
                    })
                  }
                  className={`w-full text-left border-l-2 ${s.border} pl-3 py-1.5 rounded-r-md hover:bg-muted/50 transition-colors flex items-start gap-2`}
                >
                  <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${s.iconColor}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground leading-snug">
                      {a.title ?? "Alerte"}
                    </div>
                    {a.description && (
                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {a.description}
                      </div>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

AlertsPanel.colSpan = 6;
