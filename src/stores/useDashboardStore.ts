import { create } from "zustand";
import type { DashboardComponent } from "@/lib/types";

interface DashboardState {
  currentComponents: DashboardComponent[];
  setComponents: (c: DashboardComponent[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentComponents: [],
  setComponents: (c) => set({ currentComponents: c }),
}));
