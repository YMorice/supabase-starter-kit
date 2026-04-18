import type { AgentResponse } from "./types";

const scenarios: AgentResponse[] = [
  {
    message: "Profil jeune actif, première opportunité de crédit identifiée.",
    components: [
      {
        type: "client_profile",
        data: {
          name: "Camille Lefèvre",
          age: 29,
          profession: "Ingénieure logiciel",
          riskProfile: "Balanced",
        },
      },
      {
        type: "financial_summary",
        data: {
          monthlyIncome: { value: 4200, trend: 3.2, sparkline: [3900, 4000, 4050, 4100, 4150, 4200] },
          monthlyExpenses: { value: 2350, trend: -1.4, sparkline: [2500, 2480, 2420, 2400, 2380, 2350] },
          totalSavings: { value: 18400, trend: 8.1, sparkline: [14000, 15200, 16100, 16900, 17600, 18400] },
        },
      },
      {
        type: "opportunities",
        data: [
          { title: "Prêt immobilier primo-accédant", rationale: "Capacité d'emprunt estimée à 220 000 € sur 25 ans." },
          { title: "PEA jeune actif", rationale: "Optimisation fiscale long terme avec versement programmé 200 €/mois." },
        ],
      },
    ],
  },
  {
    message: "Famille avec prêt immobilier, refinancement envisageable.",
    components: [
      {
        type: "client_profile",
        data: {
          name: "Famille Moreau",
          age: 42,
          profession: "Cadre & Enseignante",
          riskProfile: "Conservative",
        },
      },
      {
        type: "financial_summary",
        data: {
          monthlyIncome: { value: 7800, trend: 1.1, sparkline: [7600, 7650, 7700, 7720, 7780, 7800] },
          monthlyExpenses: { value: 5200, trend: 2.3, sparkline: [5000, 5050, 5100, 5150, 5180, 5200] },
          totalSavings: { value: 42000, trend: -0.8, sparkline: [44000, 43500, 43000, 42500, 42200, 42000] },
        },
      },
      {
        type: "loans",
        data: [
          { type: "Prêt immobilier", amount: 285000, rate: 3.4, duration: "20 ans", remaining: 198000 },
          { type: "Prêt auto", amount: 22000, rate: 4.1, duration: "5 ans", remaining: 9800 },
        ],
      },
      {
        type: "alerts",
        data: [
          { title: "Taux d'endettement élevé", description: "33% des revenus consacrés au remboursement.", severity: "warning" },
        ],
      },
      {
        type: "opportunities",
        data: [
          { title: "Renégociation prêt immobilier", rationale: "Économie estimée 14 200 € sur la durée restante." },
        ],
      },
    ],
  },
  {
    message: "Client pré-retraite, optimisation de l'épargne.",
    components: [
      {
        type: "client_profile",
        data: {
          name: "Jean-Pierre Dubois",
          age: 58,
          profession: "Directeur commercial",
          riskProfile: "Conservative",
        },
      },
      {
        type: "financial_summary",
        data: {
          monthlyIncome: { value: 9400, sparkline: [9300, 9350, 9380, 9400, 9400, 9400] },
          monthlyExpenses: { value: 4100, sparkline: [4200, 4150, 4120, 4100, 4100, 4100] },
          totalSavings: { value: 312000, trend: 4.2, sparkline: [285000, 290000, 297000, 302000, 308000, 312000] },
        },
      },
      {
        type: "alerts",
        data: [
          { title: "Allocation déséquilibrée", description: "85% en fonds euros, rendement sous-optimal.", severity: "warning" },
        ],
      },
      {
        type: "opportunities",
        data: [
          { title: "PER individuel", rationale: "Déduction fiscale jusqu'à 32 909 € sur les revenus imposables." },
          { title: "Assurance-vie multisupport", rationale: "Diversification UC pour préparer la transmission." },
          { title: "SCPI de rendement", rationale: "Complément de revenus locatifs estimé à 4,5%/an." },
        ],
      },
    ],
  },
];

let cursor = 0;

export async function callMockAgent(_prompt: string): Promise<AgentResponse> {
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
  const res = scenarios[cursor % scenarios.length];
  cursor += 1;
  return res;
}

export async function callAgent(prompt: string): Promise<AgentResponse> {
  const useMock = import.meta.env.VITE_USE_MOCK !== "false";
  if (useMock) return callMockAgent(prompt);

  const url = import.meta.env.VITE_AGENT_WEBHOOK_URL as string | undefined;
  if (!url) return callMockAgent(prompt);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(`Agent error ${res.status}`);
  return (await res.json()) as AgentResponse;
}
