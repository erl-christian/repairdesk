import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import RepairRequestForm from "./components/RepairRequestForm";

import { useState } from "react";

export default function RepairRequestFormPage() {
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  if (ticketNumber) {
    return (
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-10">
        <Card className="w-full max-w-lg">
          <CardContent className="space-y-6 p-8 text-center">
            <div>
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                ✓
              </div>

              <h1 className="text-2xl font-bold">
                Repair Request Submitted!
              </h1>

              <p className="mt-2 text-muted-foreground">
                Your repair request has been successfully submitted.
              </p>
            </div>

            <div className="rounded-lg border bg-muted/50 p-5">
              <p className="text-sm text-muted-foreground">
                Your Ticket Number
              </p>

              <p className="mt-2 text-2xl font-bold tracking-wide">
                {ticketNumber}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Please save your ticket number and phone number.
                You will need both to track your repair request.
              </p>

              <Button asChild className="w-full">
                <Link to="/track">
                  Track My Repair
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setTicketNumber(null)}
              >
                Submit Another Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Request a Repair
        </h1>

        <p className="mt-2 text-muted-foreground">
          Tell us about your device and the problem you're experiencing.
          We'll review your request and get back to you.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8">
          <RepairRequestForm
            onSuccess={(ticket) => setTicketNumber(ticket)}
          />
        </CardContent>
      </Card>
    </div>
  );
}