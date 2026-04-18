export interface RawAlert {
  severity?: "danger" | "warning" | "info" | string;
  title?: string;
  description?: string;
}

export interface RawOpportunity {
  title?: string;
  rationale?: string;
}

export interface KeyPoint {
  id: string;
  source: "alert" | "opportunity";
  severity?: string;
  title: string;
  description?: string;
}

function hash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

export function mergeKeyPoints(
  alerts: RawAlert[] = [],
  opportunities: RawOpportunity[] = [],
  max = 3,
): KeyPoint[] {
  const dangers = alerts.filter((a) => a.severity === "danger");
  const warnings = alerts.filter((a) => a.severity === "warning");
  const infos = alerts.filter(
    (a) => a.severity !== "danger" && a.severity !== "warning",
  );

  const ordered: KeyPoint[] = [];

  for (const a of dangers) {
    ordered.push({
      id: hash(`alert:${a.title ?? ""}`),
      source: "alert",
      severity: "danger",
      title: a.title ?? "Alerte critique",
      description: a.description,
    });
  }
  for (const a of warnings) {
    ordered.push({
      id: hash(`alert:${a.title ?? ""}`),
      source: "alert",
      severity: "warning",
      title: a.title ?? "Alerte",
      description: a.description,
    });
  }
  for (const o of opportunities) {
    ordered.push({
      id: hash(`opportunity:${o.title ?? ""}`),
      source: "opportunity",
      title: o.title ?? "Opportunité",
      description: o.rationale,
    });
  }
  for (const a of infos) {
    ordered.push({
      id: hash(`alert:${a.title ?? ""}`),
      source: "alert",
      severity: "info",
      title: a.title ?? "Information",
      description: a.description,
    });
  }

  return ordered.slice(0, max);
}
