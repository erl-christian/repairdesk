import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRepairRequest } from "./hooks";
import { Wrench, User, Smartphone, Calendar, FileText } from "lucide-react";
import RepairNotesSection from "@/features/repair-note/components/RepairNotesSection";
import RepairRequestStatusActions from "./components/RepairRequestStatusActions";

type Props = {
  repairId: string | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function RepairRequestDetailsModal({ repairId, isOpen, onClose }: Props) {
  const {
    data: request,
    isFetching,
    isError,
  } = useRepairRequest(repairId ?? "");

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      {/* 
        CRITICAL FIX: 
        Added `sm:max-w-[1204px]` to override the default shadcn/ui narrow width.
        Added `!h-[820px]` to force the height.
      */}
      <DialogContent 
        className="!h-[820px] max-h-[95vh] w-full max-w-[1204px] sm:max-w-[1204px] overflow-hidden p-0 bg-background shadow-xl flex flex-col gap-0"
      >
        
        {/* HEADER */}
        <DialogHeader className="px-8 pt-8 pb-4">
          <DialogTitle className="text-2xl text-center font-semibold text-foreground">
            Repair Request Details
          </DialogTitle>
          {request && !isFetching && (
            <p className="text-center text-sm text-muted-foreground mt-1">
              Ticket: <span className="font-medium text-foreground">{request.publicTicketNumber ?? "N/A"}</span> • 
              Status: <span className="font-medium capitalize text-foreground ml-1">{request.status?.replaceAll("_", " ") ?? "Unknown"}</span>
            </p>
          )}
        </DialogHeader>

        {/* CONTENT AREA: Scrollable body fills the remaining 820px height */}
        <div className="flex-1 overflow-y-auto px-8 py-4">
          {isFetching && (
            <div className="py-12 text-center flex flex-col items-center justify-center h-full">
              <Wrench className="h-8 w-8 animate-pulse text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading repair request...</p>
            </div>
          )}

          {isError && !isFetching && (
            <div className="py-12 text-center h-full flex items-center justify-center">
              <p className="text-destructive font-medium">Failed to load repair request.</p>
            </div>
          )}

          {request && !isFetching && (
            <div className="space-y-8 max-w-5xl mx-auto mt-4">
              
              {/* Grid Layout mimicking the 2-column form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                
                {/* Customer Info Section */}
                <div className="space-y-4">
                  <h3 className="flex items-center text-sm font-semibold text-foreground border-b pb-2">
                    <User className="w-4 h-4 mr-2 text-muted-foreground" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Name</p>
                      <p className="text-sm font-medium">{request.customerName ?? "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Phone</p>
                      <p className="text-sm font-medium">{request.phoneNumber ?? "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground mb-1">Email</p>
                      <p className="text-sm font-medium">{request.email ?? "Not provided"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground mb-1">Municipality</p>
                      <p className="text-sm font-medium">{request.municipality ?? "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Device Info Section */}
                <div className="space-y-4">
                  <h3 className="flex items-center text-sm font-semibold text-foreground border-b pb-2">
                    <Smartphone className="w-4 h-4 mr-2 text-muted-foreground" />
                    Device Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground mb-1">Device Type</p>
                      <p className="text-sm font-medium">{request.deviceType ?? "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Brand</p>
                      <p className="text-sm font-medium">{request.deviceBrand ?? "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Model</p>
                      <p className="text-sm font-medium">{request.deviceModel ?? "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Service Details Section */}
                <div className="space-y-4">
                  <h3 className="flex items-center text-sm font-semibold text-foreground border-b pb-2">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    Service Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground mb-1">Service Method</p>
                      <p className="text-sm font-medium capitalize">{request.serviceMethod?.replaceAll("_", " ") ?? "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Preferred Date</p>
                      <p className="text-sm font-medium">
                        {request.preferredDate
                          ? new Date(request.preferredDate).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Preferred Time</p>
                      <p className="text-sm font-medium">{request.preferredTime ?? "Not specified"}</p>
                    </div>
                  </div>
                </div>
                <RepairNotesSection
                  repairRequestId={request.id}
                />

                {/* Problem Description Section */}
                <div className="space-y-4">
                  <h3 className="flex items-center text-sm font-semibold text-foreground border-b pb-2">
                    <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                    Repair Problem
                  </h3>
                  <div className="bg-muted/30 p-4 rounded-md border border-border/50 h-[120px] overflow-y-auto">
                    <p className="whitespace-pre-wrap text-sm text-foreground/90">
                      {request.problemDescription ?? "No description provided."}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
        {/* FOOTER */}
        <DialogFooter className="px-8 pt-4 pb-8 bg-muted/50 border-t border-border flex justify-end sm:justify-end gap-2 shrink-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          
          {/* FIX: Only render Status Actions if the request has successfully loaded */}
          {request && (
            <RepairRequestStatusActions
              repairRequestId={request.id}
              currentStatus={request.status}
            />
          )}
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}