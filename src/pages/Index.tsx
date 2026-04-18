import { motion } from "framer-motion";
import Header from "@/components/shell/Header";
import ClientSearch from "@/components/shell/ClientSearch";
import PromptBar from "@/components/shell/PromptBar";
import HistorySheet from "@/components/shell/HistorySheet";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import { useClientStore } from "@/lib/store";
import { useClientSnapshots } from "@/lib/hooks";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Index() {
  const selectedClientId = useClientStore((s) => s.selectedClientId);
  const viewingSnapshotId = useClientStore((s) => s.viewingSnapshotId);
  const setViewingSnapshot = useClientStore((s) => s.setViewingSnapshot);

  const { data: snapshots = [], isLoading } = useClientSnapshots(selectedClientId);
  const latest = snapshots[0];
  const viewing = viewingSnapshotId ? snapshots.find((s) => s.id === viewingSnapshotId) ?? latest : latest;
  const isHistorical = !!viewingSnapshotId && viewing?.id !== latest?.id;

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {!selectedClientId ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                Espace Conseiller
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Recherchez un client pour ouvrir son tableau de bord.
              </p>
            </div>
            <ClientSearch variant="hero" />
          </div>
        ) : (
          <>
            {isHistorical && viewing && (
              <div className="px-6 pt-4 pb-2">
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-xs text-warning bg-warning/10 border border-warning/20 rounded-md px-3 py-1.5 w-fit"
                >
                  <span>
                    Vous consultez une version du{" "}
                    {format(new Date(viewing.created_at), "dd MMM yyyy à HH:mm", { locale: fr })}.
                  </span>
                  <button
                    className="underline font-medium hover:text-warning/80"
                    onClick={() => setViewingSnapshot(null)}
                  >
                    Revenir à la version actuelle
                  </button>
                </motion.div>
              </div>
            )}

            <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-28">
              {isLoading ? (
                <div className="text-sm text-muted-foreground">Chargement…</div>
              ) : viewing ? (
                <DashboardGrid payload={viewing.payload ?? {}} />
              ) : (
                <div className="text-sm text-muted-foreground">Aucune analyse disponible pour ce client.</div>
              )}
            </div>
          </>
        )}
      </main>

      {selectedClientId && <PromptBar />}
    </div>
  );
}
