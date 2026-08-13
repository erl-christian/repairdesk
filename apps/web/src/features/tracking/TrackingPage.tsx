import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Wrench,
} from "lucide-react";

import TrackingForm from "./components/TrackingForm";

type TrackingNote = {
  id: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

type TrackingTimelineItem = {
  id: string;
  status: string;
  note: string | null;
  createdAt: string;
};

export type TrackingResult = {
  ticketNumber: string;
  customerName: string;

  deviceType: string;
  deviceBrand: string | null;
  deviceModel: string | null;

  problemDescription: string;

  serviceMethod: string;
  municipality: string;

  preferredDate: string | null;
  preferredTime: string | null;

  status: string;

  createdAt: string;
  updatedAt: string;

  notes: TrackingNote[];
  timeline: TrackingTimelineItem[];
};

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getStatusDescription(status: string) {
  switch (status) {
    case "PENDING_REVIEW":
      return "Your repair request has been submitted and is waiting for review.";

    case "ACCEPTED":
      return "Your repair request has been accepted.";

    case "IN_PROGRESS":
      return "Your device is currently being repaired.";

    case "WAITING_PARTS":
      return "The repair is currently waiting for the required parts.";

    case "READY_FOR_PICKUP":
      return "Your device is ready for pickup.";

    case "COMPLETED":
      return "Your repair has been completed.";

    case "CANCELLED":
      return "This repair request has been cancelled.";

    default:
      return "Your repair request is currently being processed.";
  }
}

export default function TrackingPage() {
  const [result, setResult] = useState<TrackingResult | null>(null);

  const handleTrackingSuccess = (data: TrackingResult) => {
    setResult(data);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {!result ? (
          <TrackingForm onSuccess={handleTrackingSuccess} />
        ) : (
          <div className="space-y-6">
            {/* PAGE HEADER */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Repair Tracking
              </h1>

              <p className="mt-1 text-muted-foreground">
                Here are the details and current status of your repair
                request.
              </p>
            </div>

            {/* TICKET INFORMATION */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Ticket Number
                  </p>

                  <p className="text-2xl font-bold">
                    {result.ticketNumber}
                  </p>
                </div>

                <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {formatStatus(result.status)}
                </div>
              </div>
            </div>

            {/* CURRENT STATUS */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Wrench className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Current Status
                  </h2>

                  <p className="mt-1 text-lg font-semibold">
                    {formatStatus(result.status)}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {getStatusDescription(result.status)}
                  </p>
                </div>
              </div>
            </div>

            {/* CUSTOMER INFORMATION */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">
                Customer Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Customer
                  </p>

                  <p className="font-medium">
                    {result.customerName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Request Date
                  </p>

                  <p className="font-medium">
                    {formatDate(result.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Municipality
                  </p>

                  <p className="font-medium">
                    {result.municipality}
                  </p>
                </div>
              </div>
            </div>

            {/* DEVICE INFORMATION */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">
                Device Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Device Type
                  </p>

                  <p className="font-medium">
                    {result.deviceType || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Brand
                  </p>

                  <p className="font-medium">
                    {result.deviceBrand || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Model
                  </p>

                  <p className="font-medium">
                    {result.deviceModel || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* REPAIR PROBLEM */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />

                <h2 className="text-xl font-semibold">
                  Repair Problem
                </h2>
              </div>

              <div className="rounded-md border bg-muted/30 p-4">
                <p className="whitespace-pre-wrap text-sm leading-6">
                  {result.problemDescription ||
                    "No problem description provided."}
                </p>
              </div>
            </div>

            {/* SERVICE DETAILS */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">
                Service Details
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Wrench className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Service Method
                    </p>

                    <p className="font-medium">
                      {formatStatus(result.serviceMethod)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Municipality
                    </p>

                    <p className="font-medium">
                      {result.municipality}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Preferred Date
                    </p>

                    <p className="font-medium">
                      {result.preferredDate
                        ? formatDate(result.preferredDate)
                        : "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Preferred Time
                    </p>

                    <p className="font-medium">
                      {result.preferredTime || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* REPAIR TIMELINE */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />

                <h2 className="text-xl font-semibold">
                  Repair Timeline
                </h2>
              </div>

              {result.timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No timeline events available.
                </p>
              ) : (
                <div className="space-y-6">
                  {result.timeline.map((event, index) => (
                    <div
                      key={event.id}
                      className="relative flex gap-4"
                    >
                      {index < result.timeline.length - 1 && (
                        <div className="absolute left-[9px] top-6 h-full w-px bg-border" />
                      )}

                      <div className="relative z-10 mt-1">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                      </div>

                      <div className="flex-1 pb-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-semibold">
                            {formatStatus(event.status)}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(event.createdAt)}
                          </p>
                        </div>

                        {event.note && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {event.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* REPAIR NOTES */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />

                <h2 className="text-xl font-semibold">
                  Repair Notes
                </h2>
              </div>

              {result.notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No repair notes have been added yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {result.notes.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-md border bg-muted/30 p-4"
                    >
                      <p className="whitespace-pre-wrap text-sm leading-6">
                        {note.note}
                      </p>

                      <p className="mt-3 text-xs text-muted-foreground">
                        {formatDateTime(note.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* TRACK ANOTHER */}
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-md border bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Track Another Repair
            </button>
          </div>
        )}
      </div>
    </div>
  );
}