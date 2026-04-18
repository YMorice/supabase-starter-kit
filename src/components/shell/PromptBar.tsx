import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useClientStore, useUIStore } from "@/lib/store";
import { submitPrompt, useClientPrompts } from "@/lib/hooks";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export default function PromptBar() {
  const clientId = useClientStore((s) => s.selectedClientId);
  const isPending = useUIStore((s) => s.isPromptPending);
  const setPending = useUIStore((s) => s.setPromptPending);
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const { data: prompts = [] } = useClientPrompts(clientId);

  // Auto-grow
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 72)}px`;
  }, [value]);

  if (!clientId) return null;

  const send = async () => {
    const content = value.trim();
    if (!content || isPending) return;
    setPending(true);
    setValue("");
    try {
      await submitPrompt(clientId, content);
    } catch (e) {
      console.error(e);
      setPending(false);
    }
    // Pending stays true until n8n inserts a snapshot. For demo, release after 4s.
    setTimeout(() => setPending(false), 4000);
  };

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed left-1/2 -translate-x-1/2 bottom-6 z-40 w-[min(760px,calc(100%-32px))]"
    >
      <div className="bg-surface/95 backdrop-blur-xl border border-border rounded-[28px] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] px-3 py-2.5 flex items-end gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted shrink-0"
            >
              <History className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="w-80 p-0 rounded-2xl">
            <div className="px-3 py-2 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Prompts récents
            </div>
            {prompts.length === 0 ? (
              <div className="px-3 py-6 text-sm text-muted-foreground text-center">Aucun prompt encore.</div>
            ) : (
              <ul className="max-h-72 overflow-y-auto">
                {prompts.map((p) => (
                  <li key={p.id} className="px-3 py-2 border-b border-border last:border-0 text-sm">
                    <div className="line-clamp-2 text-foreground">{p.content}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
                      <span>{formatDistanceToNow(new Date(p.created_at), { locale: fr, addSuffix: true })}</span>
                      <span>·</span>
                      <span>{p.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </PopoverContent>
        </Popover>

        <div className="flex-1 relative min-h-[36px] flex items-center">
          <textarea
            ref={taRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={isPending ? "" : "Affinez l'analyse de ce client…"}
            disabled={isPending}
            className="w-full bg-transparent resize-none outline-none text-[15px] placeholder:text-muted-foreground leading-6 max-h-[120px] py-1.5"
          />
          {isPending && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[15px] text-muted-foreground pointer-events-none">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              Analyse en cours…
            </div>
          )}
        </div>

        <button
          onClick={send}
          disabled={!value.trim() || isPending}
          className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[hsl(var(--primary-dark))] transition-colors shrink-0"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
