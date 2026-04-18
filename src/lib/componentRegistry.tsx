import type { ComponentType, ReactElement } from "react";
import ClientProfileCard from "@/components/dashboard/ClientProfileCard";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import LoansTable from "@/components/dashboard/LoansTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import OpportunitiesPanel from "@/components/dashboard/OpportunitiesPanel";

type RegistryEntry = ComponentType<{ data?: Record<string, unknown> }> & { colSpan?: number };

export const componentRegistry: Record<string, RegistryEntry> = {
  client_profile: ClientProfileCard as RegistryEntry,
  financial_summary: FinancialSummary as RegistryEntry,
  loans: LoansTable as RegistryEntry,
  alerts: AlertsPanel as RegistryEntry,
  opportunities: OpportunitiesPanel as RegistryEntry,
};

export function getComponent(type: string): RegistryEntry | null {
  return componentRegistry[type] ?? null;
}

export function renderRegistryComponent(
  type: string,
  data: Record<string, unknown> | undefined,
): { node: ReactElement; colSpan: number } | null {
  const Comp = getComponent(type);
  if (!Comp) return null;
  return {
    node: <Comp data={data} />,
    colSpan: Comp.colSpan ?? 6,
  };
}
