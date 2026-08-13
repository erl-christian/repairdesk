import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { TrackingResult } from "../TrackingPage";

type TrackingFormProps = {
  onSuccess: (data: TrackingResult) => void;
};

export default function TrackingForm({
  onSuccess,
}: TrackingFormProps) {
  const [ticketNumber, setTicketNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!ticketNumber.trim() || !phoneNumber.trim()) {
      setError(
        "Please enter your ticket number and phone number."
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000/api/v1"
        }/repair-requests/track`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticketNumber: ticketNumber.trim(),
            phoneNumber: phoneNumber.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to find repair request."
        );
      }

      onSuccess(result.data);
    } catch (error) {
      console.error("Tracking error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to find repair request."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">
          Track Your Repair
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Enter your ticket number and phone number to check
          the status of your repair request.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Ticket Number */}
          <div className="space-y-2">
            <label
              htmlFor="ticketNumber"
              className="text-sm font-medium"
            >
              Ticket Number
            </label>

            <Input
              id="ticketNumber"
              type="text"
              placeholder="RD-BHL-2026-8105"
              value={ticketNumber}
              onChange={(event) =>
                setTicketNumber(event.target.value)
              }
              disabled={isLoading}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium"
            >
              Phone Number
            </label>

            <Input
              id="phoneNumber"
              type="tel"
              placeholder="09123456789"
              value={phoneNumber}
              onChange={(event) =>
                setPhoneNumber(event.target.value)
              }
              disabled={isLoading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3">
              <p className="text-sm text-destructive">
                {error}
              </p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Track Repair"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}