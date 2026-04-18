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
    <Card className="p-5 h-full flex flex-col gap-3">
      <div>
        <h2 className="text-[18px] font-semibold leading-tight text-foreground">{name}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {[age ? `${age} ans` : null, job].filter(Boolean).join(" · ") || "—"}
        </p>
      </div>
      <div className="mt-auto">
        {risk ? (
          <Badge variant="secondary" className="font-medium">
            Profil {risk.toLowerCase()}
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Profil non défini</span>
        )}
      </div>
    </Card>
  );
}

ClientProfileCard.colSpan = 4;
