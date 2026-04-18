import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Zap, Lightbulb, CheckCircle2, Info } from "lucide-react";
import type { KeyPoint } from "@/lib/keyPoints";
import { useDetailPanel } from "@/lib/detailPanel";

interface Props {
  clientId: string;
  points: KeyPoint[];
}

const STORAGE_PREFIX = "bnp:keypoints:";

function loadState(clientId: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + clientId);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(clientId: string, state: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_PREFIX + clientId, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function iconFor(p: KeyPoint) {
  if (p.source === "opportunity") return Lightbulb;
  if (p.severity === "danger") return AlertTriangle;
  if (p.severity === "warning") return Zap;
  return Info;
}

function colorFor(p: KeyPoint) {
  if (p.source === "opportunity") return "text-primary";
  if (p.severity === "danger") return "text-destructive";
  if (p.severity === "warning") return "text-warning";
  return "text-muted-foreground";
}

export default function KeyPointsPanel({ clientId, points }: Props) {
  const [state, setState] = useState<Record<string, boolean>>({});
  const openDetail = useDetailPanel((s) => s.openDetail);

  useEffect(() => {
    setState(loadState(clientId));
  }, [clientId]);

  const toggle = (id: string) => {
    setState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveState(clientId, next);
      return next;
    });
  };

  const allChecked = points.length > 0 && points.every((p) => state[p.id]);

  return (
    <Card className="px-4 py-3 bg-primary/[0.04] border-primary/20">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[13px] font-semibold text-foreground uppercase tracking-wide">
          Points clés à aborder
        </h2>
        {allChecked && (
          <span className="text-[11px] text-primary font-medium flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Tous traités
          </span>
        )}
      </div>

      {points.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Pas de point particulier à signaler pour ce RDV.
        </p>
      ) : (
        <ul className="flex flex-col gap-0.5">
          {points.map((p) => {
            const Icon = iconFor(p);
            const checked = !!state[p.id];
            return (
              <li
                key={p.id}
                className={`group flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-background/60 ${
                  checked ? "opacity-60" : ""
                }`}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggle(p.id)}
                  className="h-3.5 w-3.5"
                  aria-label={`Marquer "${p.title}" comme traité`}
                />
                <button
                  type="button"
                  onClick={() =>
                    openDetail({
                      source: p.source,
                      severity: p.severity,
                      title: p.title,
                      description: p.description,
                    })
                  }
                  className="flex-1 text-left flex items-center gap-1.5 min-w-0"
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${colorFor(p)}`} />
                  <span
                    className={`text-[13px] font-medium text-foreground leading-tight truncate ${
                      checked ? "line-through" : ""
                    }`}
                  >
                    {p.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
