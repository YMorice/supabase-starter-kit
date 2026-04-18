import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LifeEvent {
  date?: string;
  type?: string;
  categorie?: string;
  description?: string;
  criticite?: string;
}

interface Props {
  data?: { events?: LifeEvent[] };
}

const criticiteColor = (c?: string) => {
  if (c === "Urgent") return "bg-destructive";
  if (c === "Attention") return "bg-warning";
  return "bg-primary";
};

export default function LifeEventsTimeline({ data }: Props) {
  const events = data?.events ?? [];

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-3">
        Événements &amp; Interactions
      </div>
      {events.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
          Aucun événement récent
        </div>
      ) : (
        <ul className="flex flex-col gap-0">
          {events.map((ev, i) => (
            <li key={i} className="flex gap-3 pb-3 last:pb-0">
              <div className="flex flex-col items-center pt-1.5">
                <span className={`h-2 w-2 rounded-full shrink-0 ${criticiteColor(ev.criticite)}`} />
                {i < events.length - 1 && <span className="w-px flex-1 bg-border mt-1" />}
              </div>
              <div className="min-w-0 pb-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground">
                    {ev.description ?? "Événement"}
                  </span>
                  {ev.type && (
                    <Badge variant="secondary" className="text-[10px] font-normal">
                      {ev.type}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {[ev.date, ev.categorie].filter(Boolean).join(" · ")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

LifeEventsTimeline.colSpan = 6;
