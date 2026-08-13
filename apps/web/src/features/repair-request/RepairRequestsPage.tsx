import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import RepairRequestFilters from "./components/StatusFilter";
import RepairRequestsTable from "./components/RepairRequestsTable";
import RepairRequestDetailsModal from "./RepairRequestDetailsModal";
import { useRepairRequests } from "./hooks";

export default function RepairRequestsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  
  // State to manage which repair request is currently open in the modal
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);

  const limit = 10;

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useRepairRequests({
    page,
    limit,
    search: search || undefined,
    status: status || undefined,
  });

  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const goToPreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const goToNextPage = () => {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">
          Loading repair requests...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-destructive">
          Failed to load repair requests.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Repair Requests
        </h1>
        <p className="text-muted-foreground">
          View and manage customer repair requests.
        </p>
      </div>

      {/* Filters */}
      <RepairRequestFilters
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
      />

      {/* Table */}
      <div className={isFetching ? "opacity-60 transition-opacity duration-200" : "transition-opacity duration-200"}>
        <RepairRequestsTable
          repairs={data?.repairRequests ?? []}
          onViewDetails={(id) => setSelectedRepairId(id)}
        />
      </div>

      {/* Details Modal */}
      <RepairRequestDetailsModal
        repairId={selectedRepairId}
        isOpen={!!selectedRepairId}
        onClose={() => setSelectedRepairId(null)}
      />

      {/* Pagination */}
      {pagination && pagination.totalItems > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Results information */}
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} ·{" "}
            {pagination.totalItems} total requests
          </p>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={page <= 1 || isFetching}
            >
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={page >= totalPages || isFetching}
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}