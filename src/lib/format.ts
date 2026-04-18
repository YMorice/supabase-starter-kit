export function formatEUR(value: unknown, opts: { compact?: boolean } = {}): string {
  const n = typeof value === "string" ? parseFloat(value) : (value as number);
  if (n == null || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: opts.compact ? 0 : 0,
  }).format(n);
}

export function initials(name?: string | null): string {
  if (!name) return "·";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
