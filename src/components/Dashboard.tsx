import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/stores/useChatStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { componentRegistry } from "@/lib/componentRegistry";
import { Skeleton } from "@/components/ui/skeleton";

export function Dashboard() {
  const components = useDashboardStore((s) => s.currentComponents);
  const isLoading = useChatStore((s) => s.isLoading);

  if (components.length === 0 && !isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="text-sm font-medium text-foreground">Aucune analyse en cours</div>
          <p className="text-xs text-muted-foreground mt-1">
            Posez une question au copilote pour générer un tableau de bord client.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && components.length === 0 && (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-40 w-full" />
        </div>
      )}

      <div className={isLoading ? "opacity-60 transition-opacity" : "transition-opacity"}>
        <AnimatePresence mode="popLayout">
          <div className="space-y-4">
            {components.map((c, idx) => {
              const Comp = componentRegistry[c.type];
              if (!Comp) return null;
              return (
                <motion.div
                  key={`${c.type}-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Comp data={c.data} />
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
