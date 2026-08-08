import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { RepairRequest } from "../types";

import RepairStatusBadge from "./RepairStatusBadge";

type Props = {
  repairs: RepairRequest[];
};

export default function RepairRequestsTable({
  repairs,
}: Props) {
  if (repairs.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          No repair requests found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Municipality</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell className="font-medium">
                {repair.publicTicketNumber}
              </TableCell>

              <TableCell>
                {repair.customerName}
              </TableCell>

              <TableCell>
                <div>
                  <p className="font-medium">
                    {repair.deviceBrand} {repair.deviceModel}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {repair.deviceType}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                {repair.municipality}
              </TableCell>

              <TableCell>
                <RepairStatusBadge
                  status={repair.status}
                />
              </TableCell>

              <TableCell>
                {new Date(
                  repair.createdAt
                ).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}