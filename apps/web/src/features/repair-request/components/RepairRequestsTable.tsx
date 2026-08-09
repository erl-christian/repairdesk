import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RepairRequest } from "../types";
import RepairStatusBadge from "./RepairStatusBadge";

type Props = {
  repairs: RepairRequest[];
  onViewDetails: (id: string) => void; // Added prop for modal
};

export default function RepairRequestsTable({ repairs, onViewDetails }: Props) {
  if (repairs.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No repair requests found.</p>
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell className="font-medium">{repair.publicTicketNumber}</TableCell>
              <TableCell>{repair.customerName}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">
                    {repair.deviceBrand} {repair.deviceModel}
                  </p>
                  <p className="text-xs text-muted-foreground">{repair.deviceType}</p>
                </div>
              </TableCell>
              <TableCell>{repair.municipality}</TableCell>
              <TableCell>
                <RepairStatusBadge status={repair.status} />
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewDetails(repair.id)}
                >
                  <Eye className="mr-2 size-4" />
                  View
                </Button>
              </TableCell>
              <TableCell>
                {new Date(repair.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}