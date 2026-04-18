import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useDetailPanel } from "@/lib/detailPanel";
import { AlertTriangle, Zap, Info, Lightbulb } from "lucide-react";

export default function DetailSidePanel() {
  const { open, item, close } = useDetailPanel();

  const Icon = (() => {
    if (!item) return Info;
    if (item.source === "opportunity") return Lightbulb;
    if (item.severity === "danger") return AlertTriangle;
    if (item.severity === "warning") return Zap;
    return Info;
  })();

  const accent = (() => {
    if (!item) return "text-muted-foreground";
    if (item.source === "opportunity") return "text-primary";
    if (item.severity === "danger") return "text-destructive";
    if (item.severity === "warning") return "text-warning";
    return "text-muted-foreground";
  })();

  const label = (() => {
    if (!item) return "";
    if (item.source === "opportunity") return "Opportunité";
    if (item.severity === "danger") return "Alerte critique";
    if (item.severity === "warning") return "Point de vigilance";
    return "Information";
  })();

  return (
    <Sheet open={open} onOpenChange={(o) => !o && close()}>
      <SheetContent side="right" className="w-full sm:max-w-[480px] p-0 flex flex-col">
        {item && (
          <>
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
              <div className={`flex items-center gap-2 text-[11px] uppercase tracking-wide font-medium ${accent}`}>
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
              <SheetTitle className="text-lg leading-tight">{item.title}</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {item.description && (
                <section>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    {item.source === "opportunity" ? "Justification" : "Description"}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{item.description}</p>
                </section>
              )}

              <section>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium mb-2">
                  Contexte
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Détail enrichi à venir — l'analyse IA fournira ici la situation
                  actuelle, l'impact pour le client et la recommandation détaillée.
                </p>
              </section>
            </div>

            <div className="px-6 py-4 border-t border-border">
              <Button className="w-full" size="lg">
                Action : ouvrir le formulaire
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
