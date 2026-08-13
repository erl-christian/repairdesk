import {
  CheckCircle2,
  Clock3,
  Package,
  Wrench,
  XCircle,
  Circle,
  Loader2, // Added for a loading spinner
} from "lucide-react";

import type { RepairTimelineItem } from "../types";

interface RepairTimelineProps {
  timeline: RepairTimelineItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const statusConfig: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
  }
> = {
  PENDING_REVIEW: {
    label: "Pending Review",
    icon: Clock3,
  },

  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
  },

  IN_PROGRESS: {
    label: "In Progress",
    icon: Wrench,
  },

  WAITING_PARTS: {
    label: "Waiting for Parts",
    icon: Package,
  },

  READY_FOR_PICKUP: {
    label: "Ready for Pickup",
    icon: CheckCircle2,
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
  },

  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
  },
};

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function RepairTimeline({
  timeline,
  isLoading,
  isError,
}: RepairTimelineProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-muted/30 p-6 flex flex-col items-center justify-center text-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Loading timeline...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-center">
        <p className="text-sm font-medium text-destructive">
          Failed to load timeline events.
        </p>
      </div>
    );
  }

  if (!timeline.length) {
    return (
      <div className="rounded-lg border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No timeline events yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {timeline.map((event, index) => {
        const config = statusConfig[event.status];

        const Icon = config?.icon ?? Circle;

        const isLast = index === timeline.length - 1;

        return (
          <div key={event.id} className="relative flex gap-4">
            {!isLast && (
              <div className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-border" />
            )}

            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
              <Icon className="h-4 w-4" />
            </div>

            <div className="pb-8">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-medium">
                  {config?.label ?? formatStatus(event.status)}
                </h4>

                {index === timeline.length - 1 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Current
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {formatDate(event.createdAt)}
              </p>

              {event.note && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}