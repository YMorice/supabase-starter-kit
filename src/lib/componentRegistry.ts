import type { ComponentType } from "react";
import { ClientProfileCard } from "@/components/dashboard/ClientProfileCard";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { LoansTable } from "@/components/dashboard/LoansTable";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { OpportunitiesPanel } from "@/components/dashboard/OpportunitiesPanel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentRegistry: Record<string, ComponentType<{ data: any }>> = {
  client_profile: ClientProfileCard,
  financial_summary: FinancialSummary,
  loans: LoansTable,
  alerts: AlertsPanel,
  opportunities: OpportunitiesPanel,
};
