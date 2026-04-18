import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatEUR } from "@/lib/format";

interface Loan {
  type?: string;
  montant?: number;
  taux?: number;
  duree?: string;
  restant?: number;
}

interface Props {
  data?: { loans?: Loan[] };
}

export default function LoansTable({ data }: Props) {
  const loans = data?.loans ?? [];

  return (
    <Card className="p-5 h-full flex flex-col">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-3">
        Crédits
      </div>
      {loans.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
          Aucun crédit en cours
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-8 px-2">Type</TableHead>
              <TableHead className="h-8 px-2 text-right">Montant</TableHead>
              <TableHead className="h-8 px-2 text-right">Taux</TableHead>
              <TableHead className="h-8 px-2 text-right">Durée</TableHead>
              <TableHead className="h-8 px-2 text-right">Restant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((l, i) => (
              <TableRow key={i}>
                <TableCell className="px-2 py-2 font-medium">{l.type ?? "—"}</TableCell>
                <TableCell className="px-2 py-2 text-right tabular-nums">{formatEUR(l.montant)}</TableCell>
                <TableCell className="px-2 py-2 text-right tabular-nums">
                  {l.taux != null ? `${l.taux.toFixed(2)} %` : "—"}
                </TableCell>
                <TableCell className="px-2 py-2 text-right tabular-nums text-muted-foreground">
                  {l.duree ?? "—"}
                </TableCell>
                <TableCell className="px-2 py-2 text-right tabular-nums">{formatEUR(l.restant)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

LoansTable.colSpan = 7;
