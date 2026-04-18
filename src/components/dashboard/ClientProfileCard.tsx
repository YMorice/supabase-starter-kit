import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ClientProfileData, RiskProfile } from "@/lib/types";

const riskLabel: Record<RiskProfile, string> = {
  Conservative: "Prudent",
  Balanced: "Équilibré",
  Dynamic: "Dynamique",
};

function Field({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium mt-0.5">{value ?? "—"}</div>
    </div>
  );
}

export function ClientProfileCard({ data }: { data: ClientProfileData }) {
  return (
    <Card className="p-6 shadow-none">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{data.name ?? "Client"}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Fiche client</p>
        </div>
        {data.riskProfile && (
          <Badge variant="secondary" className="font-medium">
            {riskLabel[data.riskProfile] ?? data.riskProfile}
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Field label="Âge" value={data.age} />
        <Field label="Profession" value={data.profession} />
      </div>
    </Card>
  );
}
