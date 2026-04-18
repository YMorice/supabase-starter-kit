import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Opportunity } from "@/lib/types";

export function OpportunitiesPanel({ data }: { data: Opportunity[] }) {
  return (
    <Card className="p-6 shadow-none">
      <h3 className="text-sm font-semibold mb-4">Opportunités</h3>
      <ul className="space-y-3">
        {data.map((o, i) => (
          <li
            key={i}
            className="border-l-2 border-primary pl-4 py-1 flex items-start justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="text-sm font-medium">{o.title ?? "Recommandation"}</div>
              {o.rationale && (
                <p className="text-xs text-muted-foreground mt-0.5">{o.rationale}</p>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark shrink-0">
              Explorer
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
