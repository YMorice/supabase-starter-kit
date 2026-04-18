import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { LoanRow } from "@/lib/types";

const eur = (n?: number) =>
  typeof n === "number"
    ? n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
    : "—";

export function LoansTable({ data }: { data: LoanRow[] }) {
  return (
    <Card className="shadow-none overflow-hidden">
      <div className="px-6 pt-5 pb-3">
        <h3 className="text-sm font-semibold">Prêts en cours</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead className="text-right">Taux</TableHead>
            <TableHead className="text-right">Durée</TableHead>
            <TableHead className="text-right">Restant dû</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              <TableCell className="font-medium">{row.type ?? "—"}</TableCell>
              <TableCell className="text-right font-mono tabular text-sm">{eur(row.amount)}</TableCell>
              <TableCell className="text-right font-mono tabular text-sm">
                {typeof row.rate === "number" ? `${row.rate.toFixed(2)} %` : "—"}
              </TableCell>
              <TableCell className="text-right font-mono tabular text-sm">{row.duration ?? "—"}</TableCell>
              <TableCell className="text-right font-mono tabular text-sm">{eur(row.remaining)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
