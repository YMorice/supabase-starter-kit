import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Opportunity {
  title?: string;
  rationale?: string;
}

interface Props {
  data?: { opportunities?: Opportunity[] };
}

export default function OpportunitiesPanel({ data }: Props) {
  const items = data?.opportunities ?? [];
  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-3">
        Opportunités
      </div>
      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
          Aucune opportunité identifiée
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((o, i) => (
            <li
              key={i}
              className="border-l-2 border-primary pl-3 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground">{o.title ?? "Opportunité"}</div>
                {o.rationale && (
                  <div className="text-xs text-muted-foreground mt-0.5">{o.rationale}</div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 shrink-0">
                Explorer
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

OpportunitiesPanel.colSpan = 7;
