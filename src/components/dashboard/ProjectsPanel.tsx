import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEUR } from "@/lib/format";

interface Project {
  projet?: string;
  horizon_annees?: number;
  montant_cible_eur?: number;
  priorite?: string;
}

interface Props {
  data?: { projects?: Project[] };
}

const priorityVariant = (p?: string) => {
  if (p === "Haute") return "destructive" as const;
  if (p === "Moyenne") return "warning" as const;
  return "secondary" as const;
};

export default function ProjectsPanel({ data }: Props) {
  const projects = data?.projects ?? [];

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-3">
        Projets &amp; Objectifs
      </div>
      {projects.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
          Aucun projet déclaré
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((p, i) => (
            <li key={i} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{p.projet ?? "Projet"}</span>
                  {p.priorite && (
                    <Badge variant={priorityVariant(p.priorite)} className="text-[10px]">
                      {p.priorite}
                    </Badge>
                  )}
                </div>
                {p.horizon_annees != null && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Horizon {p.horizon_annees} an{p.horizon_annees > 1 ? "s" : ""}
                  </div>
                )}
              </div>
              <span className="text-sm font-semibold tabular-nums whitespace-nowrap">
                {formatEUR(p.montant_cible_eur)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

ProjectsPanel.colSpan = 5;
