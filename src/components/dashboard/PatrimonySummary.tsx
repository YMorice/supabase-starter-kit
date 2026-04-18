import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEUR } from "@/lib/format";

interface Contract {
  contrat_id?: string;
  libelle?: string;
  famille?: string;
  encours?: number;
  statut?: string;
}

interface Props {
  data?: {
    contracts?: Contract[];
    total_encours?: number;
  };
}

export default function PatrimonySummary({ data }: Props) {
  const contracts = data?.contracts ?? [];
  const total = data?.total_encours;

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
          Patrimoine
        </div>
        {total != null && (
          <span className="text-sm font-semibold text-primary tabular-nums">
            {formatEUR(total)}
          </span>
        )}
      </div>
      {contracts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
          Aucun contrat
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {contracts.map((c, i) => (
            <li key={c.contrat_id ?? i} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {c.libelle ?? "Contrat"}
                </div>
                {c.famille && (
                  <Badge variant="outline" className="mt-0.5 text-[10px] font-normal">
                    {c.famille}
                  </Badge>
                )}
              </div>
              <span
                className={`text-sm font-semibold tabular-nums whitespace-nowrap ${
                  (c.encours ?? 0) < 0 ? "text-destructive" : "text-foreground"
                }`}
              >
                {formatEUR(c.encours)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

PatrimonySummary.colSpan = 6;
