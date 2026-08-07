import type { RepairRequest } from "../types";
import { Wrench } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  repairs: RepairRequest[];
};

export default function RecentRepairsTable({ repairs }: Props) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Recent Repair Requests</CardTitle>
        <CardDescription>A list of the most recent devices checked in for repair.</CardDescription>
      </CardHeader>

      <CardContent>
        {repairs.length === 0 ? (
          // Polished Empty State
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 mb-4 rounded-full bg-muted/50">
              <Wrench className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No recent repairs</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-1">
              You haven't received any new repair requests recently. New tickets will appear here automatically.
            </p>
          </div>
        ) : (
          // Enclosing border for the standard shadcn table look
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-[120px]">Ticket</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {repairs.map((repair) => (
                  <TableRow 
                    key={repair.id} 
                    className="transition-colors hover:bg-muted/50"
                  >
                    {/* Ticket Number - Monospace makes it look like an ID */}
                    <TableCell className="font-mono text-sm font-medium text-primary">
                      {repair.publicTicketNumber}
                    </TableCell>

                    {/* Customer */}
                    <TableCell className="font-medium">
                      {repair.customerName}
                    </TableCell>

                    {/* Device - Contrasting brand and model weights */}
                    <TableCell>
                      <span className="font-medium text-foreground">{repair.deviceBrand}</span>{" "}
                      <span className="text-muted-foreground">{repair.deviceModel}</span>
                    </TableCell>

                    {/* Description */}
                    <TableCell 
                      className="hidden max-w-[200px] truncate md:table-cell text-muted-foreground"
                      title={repair.problemDescription}
                    >
                      {repair.problemDescription}
                    </TableCell>

                    {/* Status - Capitalized cleanly */}
                    <TableCell className="text-right font-medium capitalize text-muted-foreground">
                      {repair.status.toLowerCase()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}