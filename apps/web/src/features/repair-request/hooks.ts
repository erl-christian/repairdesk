import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getRepairRequestById,
  getRepairRequests,
  updateRepairRequestStatus,
  getRepairTimeline
} from "./api";

import type {
  GetRepairRequestsParams,
} from "./types";

export function useRepairRequests(
  params: GetRepairRequestsParams = {}
) {
  return useQuery({
    queryKey: ["repair-requests", params],
    queryFn: () => getRepairRequests(params),
    placeholderData: keepPreviousData,
  });
}

export function useRepairRequest(id: string) {
  return useQuery({
    queryKey: ["repair-request", id],
    queryFn: () => getRepairRequestById(id),
    enabled: Boolean(id),
  });
}

export function useUpdateRepairRequestStatus(
  repairRequestId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: string) =>
      updateRepairRequestStatus(
        repairRequestId,
        { status }
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "repair-request",
          repairRequestId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["repair-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
    },
  });
}

export function useRepairTimeline(
  repairRequestId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ["repair-timeline", repairRequestId],
    queryFn: () => getRepairTimeline(repairRequestId!),
    enabled: Boolean(repairRequestId) && enabled,
  });
}