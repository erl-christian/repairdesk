import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
};

export default function StatusFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search ticket, customer, or phone..."
          className="pl-9"
        />
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
        className="h-10 rounded-md border bg-background px-3 text-sm"
      >
        <option value="">All Statuses</option>
        <option value="PENDING_REVIEW">
          Pending Review
        </option>
        <option value="IN_PROGRESS">
          In Progress
        </option>
        <option value="WAITING_FOR_PARTS">
          Waiting for Parts
        </option>
        <option value="READY_FOR_PICKUP">
          Ready for Pickup
        </option>
        <option value="COMPLETED">
          Completed
        </option>
        <option value="CANCELLED">
          Cancelled
        </option>
      </select>
    </div>
  );
}