import { create } from "zustand";

interface ClientStore {
  selectedClientId: string | null;
  viewingSnapshotId: string | null;
  setSelectedClient: (id: string | null) => void;
  setViewingSnapshot: (id: string | null) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  selectedClientId: null,
  viewingSnapshotId: null,
  setSelectedClient: (id) => set({ selectedClientId: id, viewingSnapshotId: null }),
  setViewingSnapshot: (id) => set({ viewingSnapshotId: id }),
}));

interface UIStore {
  isPromptPending: boolean;
  setPromptPending: (v: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isPromptPending: false,
  setPromptPending: (v) => set({ isPromptPending: v }),
}));
