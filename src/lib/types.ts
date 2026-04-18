export type RiskProfile = "Conservative" | "Balanced" | "Dynamic";

export interface ClientProfileData {
  name?: string;
  age?: number;
  profession?: string;
  riskProfile?: RiskProfile;
}

export interface FinancialSummaryData {
  monthlyIncome?: { value: number; trend?: number; sparkline?: number[] };
  monthlyExpenses?: { value: number; trend?: number; sparkline?: number[] };
  totalSavings?: { value: number; trend?: number; sparkline?: number[] };
}

export interface LoanRow {
  type?: string;
  amount?: number;
  rate?: number;
  duration?: string;
  remaining?: number;
}

export interface Alert {
  title?: string;
  description?: string;
  severity?: "warning" | "critical";
}

export interface Opportunity {
  title?: string;
  rationale?: string;
}

export type DashboardComponent =
  | { type: "client_profile"; data: ClientProfileData }
  | { type: "financial_summary"; data: FinancialSummaryData }
  | { type: "loans"; data: LoanRow[] }
  | { type: "alerts"; data: Alert[] }
  | { type: "opportunities"; data: Opportunity[] }
  | { type: string; data: unknown };

export interface AgentResponse {
  components: DashboardComponent[];
  message?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}
