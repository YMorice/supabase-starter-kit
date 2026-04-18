import { useEffect, useRef, useState } from "react";
import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { callAgent } from "@/lib/mockApi";

// Web Speech API typing
type SR = typeof window extends { SpeechRecognition: infer T } ? T : never;
function getSpeechRecognition(): (new () => SpeechRecognition) | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}
type SpeechRecognition = {
  start: () => void;
  stop: () => void;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: (e: { results: { 0: { transcript: string } }[] }) => void;
  onend: () => void;
  onerror: () => void;
};

export function ChatPanel() {
  const { messages, isLoading, addMessage, setLoading } = useChatStore();
  const setComponents = useDashboardStore((s) => s.setComponents);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognition | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const SRClass = getSpeechRecognition();
  const voiceAvailable = !!SRClass;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    addMessage({ role: "user", content: trimmed });
    setInput("");
    setLoading(true);
    try {
      const res = await callAgent(trimmed);
      setComponents(res.components ?? []);
      if (res.message) addMessage({ role: "assistant", content: res.message });
    } catch (e) {
      addMessage({ role: "assistant", content: "Erreur lors de l'appel à l'agent." });
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    if (!SRClass) return;
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const rec = new SRClass() as SpeechRecognition;
    rec.lang = "fr-FR";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      send(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="px-5 py-4 border-b">
        <div className="text-sm font-semibold">Copilote</div>
        <div className="text-xs text-muted-foreground mt-0.5">Assistant conversationnel</div>
      </div>

      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="px-5 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="text-xs text-muted-foreground">
              Démarrez la conversation. Exemples : « Affiche le profil du client », « Analyse la situation
              financière », « Cherche des opportunités d'épargne ».
            </div>
          )}
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-lg bg-secondary text-foreground px-3 py-2 text-sm">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={m.id} className="border-l-2 border-primary pl-3 text-sm text-foreground">
                {m.content}
              </div>
            ),
          )}
          {isLoading && (
            <div className="border-l-2 border-primary pl-3 flex items-center gap-1.5 h-5">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse-dot" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question…"
            className="flex-1 h-10 rounded-md border border-input bg-surface px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
            disabled={isLoading}
          />
          {voiceAvailable && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleVoice}
              className={listening ? "text-primary animate-pulse" : ""}
              aria-label="Dictée vocale"
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Envoyer">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
