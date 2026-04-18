import { Card } from "@/components/ui/card";
import { Lightbulb, CheckCircle2 } from "lucide-react";
import { useDetailPanel } from "@/lib/detailPanel";

interface Opportunity {
  title?: string;
  rationale?: string;
}

interface Props {
  data?: { opportunities?: Opportunity[] };
}

export default function OpportunitiesPanel({ data }: Props) {
  const items = data?.opportunities ?? [];
  const openDetail = useDetailPanel((s) => s.openDetail);

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-3">
        Opportunités
      </div>
      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground gap-2 text-center">
          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
          Client bien équipé, pas d'opportunité identifiée
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.slice(0, 2).map((o, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() =>
                  openDetail({
                    source: "opportunity",
                    title: o.title ?? "Opportunité",
                    description: o.rationale,
                  })
                }
                className="w-full text-left rounded-md bg-secondary/60 hover:bg-secondary transition-colors px-3 py-2 flex items-start gap-2"
              >
                <Lightbulb className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground leading-snug">
                    {o.title ?? "Opportunité"}
                  </div>
                  {o.rationale && (
                    <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {o.rationale}
                    </div>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

OpportunitiesPanel.colSpan = 6;
