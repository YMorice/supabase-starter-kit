export type ComponentType =
  | "client_profile"
  | "financial_summary"
  | "loans"
  | "alerts"
  | "opportunities"
  | "projects"
  | "cash_flow"
  | "patrimony_summary"
  | "life_events";

export interface DashboardComponent {
  type: ComponentType | string;
  data?: Record<string, unknown>;
}

export interface SnapshotPayload {
  components?: DashboardComponent[];
  message?: string;
}

export interface ClientSearchResult {
  client_id: string;
  prenom: string | null;
  nom: string | null;
  age: number | null;
  csp: string | null;
}

export interface Snapshot {
  id: string;
  client_id: string;
  payload: SnapshotPayload;
  message: string | null;
  triggered_by_prompt_id: string | null;
  created_at: string;
}

export interface Prompt {
  id: string;
  client_id: string;
  content: string;
  status: "pending" | "completed" | "failed";
  created_at: string;
  updated_at: string;
}
