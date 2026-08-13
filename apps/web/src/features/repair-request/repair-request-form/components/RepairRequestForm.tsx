import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateRepairRequest } from "../hooks";

import type { CreateRepairRequestData } from "../types";

type Props = {
  onSuccess: (ticketNumber: string) => void;
};

const initialForm: CreateRepairRequestData = {
  customerName: "",
  phoneNumber: "",
  email: "",
  deviceType: "",
  deviceBrand: "",
  deviceModel: "",
  problemDescription: "",
  serviceMethod: "CUSTOMER_VISITS_TECHNICIAN",
  municipality: "",
  preferredDate: "",
  preferredTime: "",
};

export default function RepairRequestForm({ onSuccess }: Props) {
  const [form, setForm] = useState<CreateRepairRequestData>(initialForm);
  const [error, setError] = useState("");

  const mutation = useCreateRepairRequest();

  const updateField = <K extends keyof CreateRepairRequestData>(
    field: K,
    value: CreateRepairRequestData[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    try {
      const response = await mutation.mutateAsync(form);

      if (!response.success) {
        setError("Failed to submit repair request.");
        return;
      }

      onSuccess(response.data.publicTicketNumber);
    } catch (error: any) {
        console.error("Create repair request error:", error);
        console.error("Backend response:", error?.response?.data);

        const message =
            error?.response?.data?.message ||
            "Failed to submit repair request. Please try again.";

        setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Information */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Customer Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Tell us how we can contact you.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="customerName" className="text-sm font-medium">
              Full Name
            </label>

            <Input
              id="customerName"
              value={form.customerName}
              onChange={(event) =>
                updateField("customerName", event.target.value)
              }
              placeholder="Juan Dela Cruz"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </label>

            <Input
              id="phoneNumber"
              value={form.phoneNumber}
              onChange={(event) =>
                updateField("phoneNumber", event.target.value)
              }
              placeholder="09123456789"
              required
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-muted-foreground">(Optional)</span>
            </label>

            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              placeholder="you@example.com"
            />
          </div>
        </div>
      </section>

      {/* Device Information */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Device Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Tell us about the device that needs repair.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="deviceType" className="text-sm font-medium">
              Device Type
            </label>

            <Select
              value={form.deviceType}
              onValueChange={(value) =>
                updateField("deviceType", value)
              }
            >
              <SelectTrigger id="deviceType">
                <SelectValue placeholder="Select device" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Desktop">Desktop</SelectItem>
                <SelectItem value="Smartphone">Smartphone</SelectItem>
                <SelectItem value="Tablet">Tablet</SelectItem>
                <SelectItem value="Printer">Printer</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="deviceBrand" className="text-sm font-medium">
              Brand
            </label>

            <Input
              id="deviceBrand"
              value={form.deviceBrand}
              onChange={(event) =>
                updateField("deviceBrand", event.target.value)
              }
              placeholder="Dell"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="deviceModel" className="text-sm font-medium">
              Model
            </label>

            <Input
              id="deviceModel"
              value={form.deviceModel}
              onChange={(event) =>
                updateField("deviceModel", event.target.value)
              }
              placeholder="Inspiron 15"
            />
          </div>
        </div>
      </section>

      {/* Repair Information */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Repair Information
          </h2>

          <p className="text-sm text-muted-foreground">
            Describe the problem you're experiencing.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="problemDescription"
            className="text-sm font-medium"
          >
            Problem Description
          </label>

          <Textarea
            id="problemDescription"
            value={form.problemDescription}
            onChange={(event) =>
              updateField("problemDescription", event.target.value)
            }
            placeholder="Describe what is wrong with your device..."
            className="min-h-32"
            required
          />
        </div>
      </section>

      {/* Service Details */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Service Details
          </h2>

          <p className="text-sm text-muted-foreground">
            Choose how you would like the repair service to be handled.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Service Method
          </label>

          <Select
            value={form.serviceMethod}
            onValueChange={(value) =>
              updateField(
                "serviceMethod",
                value as CreateRepairRequestData["serviceMethod"]
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service method" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="CUSTOMER_VISITS_TECHNICIAN">
                I'll bring the device to the technician
              </SelectItem>

              <SelectItem value="TECHNICIAN_VISITS_CUSTOMER">
                Technician visits my location
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="municipality" className="text-sm font-medium">
            Municipality / City
          </label>

          <Input
            id="municipality"
            value={form.municipality}
            onChange={(event) =>
              updateField("municipality", event.target.value)
            }
            placeholder="Tagbilaran City"
            required
          />
        </div>
      </section>

      {/* Preferred Schedule */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            Preferred Schedule
          </h2>

          <p className="text-sm text-muted-foreground">
            Optional. Let us know when you'd prefer the service.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="preferredDate" className="text-sm font-medium">
              Preferred Date
            </label>

            <Input
              id="preferredDate"
              type="date"
              value={form.preferredDate}
              onChange={(event) =>
                updateField("preferredDate", event.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredTime" className="text-sm font-medium">
              Preferred Time
            </label>

            <Input
              id="preferredTime"
              type="time"
              value={form.preferredTime}
              onChange={(event) =>
                updateField("preferredTime", event.target.value)
              }
            />
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">
            {error}
          </p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Submitting Repair Request..."
          : "Submit Repair Request"}
      </Button>
    </form>
  );
}