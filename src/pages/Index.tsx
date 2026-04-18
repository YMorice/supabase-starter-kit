import Header from "@/components/shell/Header";
import ClientSearch from "@/components/shell/ClientSearch";
import PromptBar from "@/components/shell/PromptBar";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import DetailSidePanel from "@/components/dashboard/DetailSidePanel";
import { useClientStore } from "@/lib/store";
import { useClientSnapshots } from "@/lib/hooks";

export default function Index() {
  const selectedClientId = useClientStore((s) => s.selectedClientId);

  const { data: snapshots = [], isLoading } = useClientSnapshots(selectedClientId);
  const latest = snapshots[0];

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
          <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-28">
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Chargement…</div>
            ) : latest ? (
              <DashboardGrid payload={latest.payload ?? {}} clientId={selectedClientId} />
            ) : (
              <div className="text-sm text-muted-foreground">Aucune analyse disponible pour ce client.</div>
            )}
          </div>
        )}
      </main>

      {selectedClientId && <PromptBar />}
      <DetailSidePanel />
    </div>
  );
}
