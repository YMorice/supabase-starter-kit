import { renderRegistryComponent } from "@/lib/componentRegistry";
import { mergeKeyPoints, type RawAlert, type RawOpportunity } from "@/lib/keyPoints";
import KeyPointsPanel from "./KeyPointsPanel";
import type { SnapshotPayload } from "@/lib/types";

interface Props {
  payload: SnapshotPayload;
  clientId: string;
}

const PRIORITY_TYPES = new Set([
  "client_profile",
  "alerts",
  "opportunities",
  "cash_flow",
]);

export default function DashboardGrid({ payload, clientId }: Props) {
  const components = payload.components ?? [];

  const findData = (type: string) =>
    components.find((c) => c.type === type)?.data as Record<string, unknown> | undefined;

  const profile = findData("client_profile");
  const alertsData = findData("alerts");
  const oppsData = findData("opportunities");
  const cashFlow = findData("cash_flow");

  const alerts = (alertsData?.alerts as RawAlert[] | undefined) ?? [];
  const opportunities = (oppsData?.opportunities as RawOpportunity[] | undefined) ?? [];
  const keyPoints = mergeKeyPoints(alerts, opportunities, 3);

  const profileNode = profile ? renderRegistryComponent("client_profile", profile) : null;
  const alertsNode = renderRegistryComponent("alerts", alertsData);
  const oppsNode = renderRegistryComponent("opportunities", oppsData);
  const cashFlowNode = cashFlow ? renderRegistryComponent("cash_flow", cashFlow) : null;

  // Secondary components (rendered below if space allows, hidden by default for one-screen)
  const secondary = components
    .filter((c) => !PRIORITY_TYPES.has(c.type))
    .map((c, i) => {
      const r = renderRegistryComponent(c.type, c.data);
      return r ? { key: `${c.type}-${i}`, ...r } : null;
    })
    .filter(Boolean);

  return (
    <div className="h-full flex flex-col gap-3 min-h-0">
      {profileNode && <div>{profileNode.node}</div>}

      <KeyPointsPanel clientId={clientId} points={keyPoints} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
        {alertsNode && <div className="min-h-0">{alertsNode.node}</div>}
        {oppsNode && <div className="min-h-0">{oppsNode.node}</div>}
      </div>

      {cashFlowNode && <div>{cashFlowNode.node}</div>}

      {secondary.length > 0 && (
        <div className="grid grid-cols-12 gap-3">
          {secondary.map((s) => (
            <div
              key={s!.key}
              style={{ gridColumn: `span ${s!.colSpan} / span ${s!.colSpan}` }}
            >
              {s!.node}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
