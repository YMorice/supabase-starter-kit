import { motion } from "framer-motion";
import { renderRegistryComponent } from "@/lib/componentRegistry";
import type { SnapshotPayload } from "@/lib/types";

interface Props {
  payload: SnapshotPayload;
}

export default function DashboardGrid({ payload }: Props) {
  const components = payload.components ?? [];

  const rendered = components
    .map((c, i) => {
      const r = renderRegistryComponent(c.type, c.data);
      if (!r) return null;
      return { key: `${c.type}-${i}`, ...r };
    })
    .filter(Boolean) as { key: string; node: React.ReactElement; colSpan: number }[];

  return (
    <div className="relative h-full">
      <div className="grid grid-cols-12 gap-4 auto-rows-min">
        {rendered.map((r, i) => (
          <motion.div
            key={r.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05, ease: "easeOut" }}
            style={{ gridColumn: `span ${r.colSpan} / span ${r.colSpan}` }}
          >
            {r.node}
          </motion.div>
        ))}
      </div>

      {isPending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/60 backdrop-blur-[1px] rounded-lg flex items-start justify-center pt-8 pointer-events-none"
        >
          <div className="grid grid-cols-12 gap-4 w-full">
            <Skeleton className="h-24 col-span-4" />
            <Skeleton className="h-24 col-span-8" />
            <Skeleton className="h-40 col-span-7" />
            <Skeleton className="h-40 col-span-5" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
