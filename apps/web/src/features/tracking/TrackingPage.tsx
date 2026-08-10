import { useState } from "react";

import TrackingForm from "./components/TrackingForm";

type TrackingResult = {
  ticketNumber: string;
  customerName: string;
  deviceType: string;
  deviceBrand: string | null;
  deviceModel: string | null;
  status: string;
  createdAt: string;
};

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
      <div className="mx-auto max-w-3xl">
        {!result ? (
          <TrackingForm onSuccess={handleTrackingSuccess} />
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Repair Tracking
              </h1>

              <p className="mt-1 text-muted-foreground">
                Here are the details and current status of your repair request.
              </p>
            </div>

            {/* Ticket Information */}
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

                <div className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
                  {result.status.replaceAll("_", " ")}
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">
                Customer Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{result.customerName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Request Date
                  </p>

                  <p className="font-medium">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Device Details */}
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
                  <p className="text-sm text-muted-foreground">Brand</p>

                  <p className="font-medium">
                    {result.deviceBrand || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Model</p>

                  <p className="font-medium">
                    {result.deviceModel || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <h2 className="mb-3 text-xl font-semibold">
                Repair Status
              </h2>

              <p className="text-lg font-semibold">
                {result.status.replaceAll("_", " ")}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Your repair request is currently being processed.
              </p>
            </div>

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