import { Badge } from "@/components/ui/badge";

type Props = {
  status: string;
};

const statusLabels: Record<string, string> = {
  PENDING_REVIEW: "Pending Review",
  IN_PROGRESS: "In Progress",
  WAITING_FOR_PARTS: "Waiting for Parts",
  READY_FOR_PICKUP: "Ready for Pickup",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default function RepairStatusBadge({
  status,
}: Props) {
  const label = statusLabels[status] ?? status;

  return (
    <Badge variant="outline">
      {label}
    </Badge>
  );
}