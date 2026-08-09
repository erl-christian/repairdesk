import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUpdateRepairRequestStatus } from "../hooks";

type Props = {
  repairRequestId: string;
  currentStatus: string;
};

const STATUS_OPTIONS = [
  { value: "PENDING_REVIEW", label: "Pending Review" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function RepairRequestStatusActions({
  repairRequestId,
  currentStatus,
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [prevCurrentStatus, setPrevCurrentStatus] = useState(currentStatus);

  // OFFICIAL REACT PATTERN: 
  // Update state directly during render if the incoming prop changes.
  // This replaces the useEffect and avoids the ESLint warning/double-render.
  if (currentStatus !== prevCurrentStatus) {
    setSelectedStatus(currentStatus);
    setPrevCurrentStatus(currentStatus);
  }

  const updateStatus = useUpdateRepairRequestStatus(repairRequestId);
  const hasChanged = selectedStatus !== currentStatus;

  const handleUpdate = () => {
    if (!hasChanged) return;
    updateStatus.mutate(selectedStatus);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Status Messages */}
      {updateStatus.isError && (
        <span className="text-sm text-destructive mr-2">Failed to update.</span>
      )}
      {updateStatus.isSuccess && !hasChanged && (
        <span className="text-sm text-green-600 mr-2">Updated!</span>
      )}

      <Select
        value={selectedStatus}
        onValueChange={setSelectedStatus}
        disabled={updateStatus.isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={handleUpdate}
        disabled={!hasChanged || updateStatus.isPending}
        className="min-w-[140px]"
      >
        {updateStatus.isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Updating...
          </>
        ) : (
          "Update Status"
        )}
      </Button>
    </div>
  );
}