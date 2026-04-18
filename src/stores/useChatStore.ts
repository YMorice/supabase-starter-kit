import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage } from "@/lib/types";

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  setLoading: (v: boolean) => void;
  clear: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      addMessage: (msg) =>
        set((s) => ({
          messages: [
            ...s.messages,
            { ...msg, id: crypto.randomUUID(), timestamp: Date.now() },
          ],
        })),
      setLoading: (v) => set({ isLoading: v }),
      clear: () => set({ messages: [] }),
    }),
    { name: "bnp-copilot-chat" },
  ),
);
