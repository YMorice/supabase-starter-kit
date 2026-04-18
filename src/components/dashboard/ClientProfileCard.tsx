import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  data?: {
    name?: string;
    age?: number | null;
    job?: string | null;
    risk_profile?: string | null;
  };
}

export default function ClientProfileCard({ data }: Props) {
  const name = data?.name?.trim() || "Client";
  const age = data?.age;
  const job = data?.job;
  const risk = data?.risk_profile;

  return (
    <Card className="px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-baseline gap-3 min-w-0">
        <h2 className="text-[18px] font-semibold leading-tight text-foreground truncate">
          {name}
        </h2>
        <p className="text-sm text-muted-foreground truncate">
          {[age ? `${age} ans` : null, job].filter(Boolean).join(" · ") || "—"}
        </p>
      </div>
      {risk ? (
        <Badge variant="secondary" className="font-medium shrink-0">
          Profil {risk.toLowerCase()}
        </Badge>
      ) : (
        <span className="text-xs text-muted-foreground shrink-0">Profil non défini</span>
      )}
    </Card>
  );
}

ClientProfileCard.colSpan = 12;
