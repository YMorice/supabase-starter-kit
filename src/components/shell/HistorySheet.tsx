import { useState } from "react";
import { History } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useClientSnapshots } from "@/lib/hooks";
import { useClientStore } from "@/lib/store";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";

export default function HistorySheet() {
  const [open, setOpen] = useState(false);
  const clientId = useClientStore((s) => s.selectedClientId);
  const viewingSnapshotId = useClientStore((s) => s.viewingSnapshotId);
  const setViewingSnapshot = useClientStore((s) => s.setViewingSnapshot);

  const { data: snapshots = [] } = useClientSnapshots(clientId);
  const activeId = viewingSnapshotId ?? snapshots[0]?.id;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <History className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[360px] sm:max-w-[360px] p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-border">
          <SheetTitle className="text-base">Historique des analyses</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          {snapshots.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground text-center">Aucune version pour ce client.</div>
          ) : (
            <ul>
              {snapshots.map((s) => {
                const isActive = s.id === activeId;
                const date = new Date(s.created_at);
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setViewingSnapshot(s.id === snapshots[0]?.id ? null : s.id);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 border-b border-border hover:bg-muted/40 transition-colors flex flex-col gap-1 ${
                        isActive ? "border-l-2 border-l-primary bg-primary/5" : "border-l-2 border-l-transparent"
                      }`}
                    >
                      <div
                        className="text-xs text-muted-foreground"
                        title={format(date, "dd MMM yyyy HH:mm", { locale: fr })}
                      >
                        {formatDistanceToNow(date, { locale: fr, addSuffix: true })}
                      </div>
                      <div className="text-sm text-foreground line-clamp-2">
                        {s.message || s.payload?.message || "Analyse"}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
