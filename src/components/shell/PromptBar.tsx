import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, History, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useClientStore, useUIStore } from "@/lib/store";
import { submitPrompt, useClientSnapshots, restoreSnapshot, submitAudio } from "@/lib/hooks";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function PromptBar() {
  const clientId = useClientStore((s) => s.selectedClientId);
  const isPending = useUIStore((s) => s.isPromptPending);
  const setPending = useUIStore((s) => s.setPromptPending);
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const qc = useQueryClient();

  const { data: snapshots = [] } = useClientSnapshots(clientId);
  const latestId = snapshots[0]?.id;

  const handleRestore = async (snapshotId: string) => {
    if (!clientId || snapshotId === latestId) return;
    try {
      await restoreSnapshot(clientId, snapshotId);
      qc.invalidateQueries({ queryKey: ["snapshots", clientId] });
    } catch (e) {
      console.error(e);
    }
  };

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
      className="fixed inset-x-0 bottom-6 z-40 mx-auto w-[min(760px,calc(100%-32px))]"
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
              Versions précédentes
            </div>
            {snapshots.length === 0 ? (
              <div className="px-3 py-6 text-sm text-muted-foreground text-center">Aucune version encore.</div>
            ) : (
              <ul className="max-h-72 overflow-y-auto">
                {snapshots.map((s, idx) => {
                  const isLatest = s.id === latestId;
                  const date = new Date(s.created_at);
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => handleRestore(s.id)}
                        disabled={isLatest}
                        className={`w-full text-left px-3 py-2 border-b border-border last:border-0 text-sm transition-colors ${
                          isLatest ? "bg-primary/5 cursor-default" : "hover:bg-muted/60"
                        }`}
                        title={isLatest ? "Version actuelle" : "Restaurer cette version"}
                      >
                        <div className="line-clamp-2 text-foreground">
                          {s.message || s.payload?.message || `Analyse #${snapshots.length - idx}`}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
                          <span>{formatDistanceToNow(date, { locale: fr, addSuffix: true })}</span>
                          <span>·</span>
                          <span>{format(date, "dd MMM HH:mm", { locale: fr })}</span>
                          {isLatest && (
                            <>
                              <span>·</span>
                              <span className="text-primary font-medium">actuelle</span>
                            </>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
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
          type="button"
          onClick={() => setIsRecording((r) => !r)}
          disabled={isPending}
          aria-label={isRecording ? "Arrêter l'enregistrement" : "Enregistrer un audio"}
          className={`relative h-9 w-9 rounded-full flex items-center justify-center transition-colors shrink-0 disabled:opacity-30 disabled:cursor-not-allowed ${
            isRecording
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
          }`}
        >
          {isRecording && (
            <>
              <span className="absolute inset-0 rounded-full bg-destructive/40 animate-ping" />
              <span className="absolute -inset-1 rounded-full border border-destructive/30 animate-pulse" />
            </>
          )}
          {isRecording ? (
            <span className="relative flex items-end gap-[2px] h-3.5">
              <span className="w-[2px] bg-current rounded-full animate-[audio-bar_0.9s_ease-in-out_infinite] h-2" />
              <span className="w-[2px] bg-current rounded-full animate-[audio-bar_0.9s_ease-in-out_infinite_0.15s] h-3.5" />
              <span className="w-[2px] bg-current rounded-full animate-[audio-bar_0.9s_ease-in-out_infinite_0.3s] h-2.5" />
              <span className="w-[2px] bg-current rounded-full animate-[audio-bar_0.9s_ease-in-out_infinite_0.45s] h-3" />
            </span>
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </button>

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
