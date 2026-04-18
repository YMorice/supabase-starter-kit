import { create } from "zustand";

export interface DetailItem {
  source: "alert" | "opportunity" | "keypoint";
  severity?: string;
  title: string;
  description?: string;
}

interface DetailPanelStore {
  open: boolean;
  item: DetailItem | null;
  openDetail: (item: DetailItem) => void;
  close: () => void;
}

export const useDetailPanel = create<DetailPanelStore>((set) => ({
  open: false,
  item: null,
  openDetail: (item) => set({ open: true, item }),
  close: () => set({ open: false }),
}));
