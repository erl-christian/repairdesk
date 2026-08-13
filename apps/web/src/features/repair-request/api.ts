import { api } from "@/lib/axios";

import type {
  GetRepairRequestsParams,
  RepairRequestDetailResponse,
  RepairRequestsResponse,
  UpdateRepairRequestStatusPayload,
  UpdateRepairRequestStatusResponse,
  RepairTimelineItem 
} from "./types";

export async function getRepairRequests(
  params: GetRepairRequestsParams = {}
) {
  const { data } = await api.get<RepairRequestsResponse>(
    "/repair-requests",
    {
      params,
    }
  );

  return data;
}

export async function getRepairRequestById(
  id: string
) {
  const { data } = await api.get<RepairRequestDetailResponse>(
    `/repair-requests/${id}`
  );

  return data.data;
}

export async function updateRepairRequestStatus(
  id: string,
  payload: UpdateRepairRequestStatusPayload
) {
  const { data } =
    await api.patch<UpdateRepairRequestStatusResponse>(
      `/repair-requests/${id}/status`,
      payload
    );

  return data;
}

export async function getRepairTimeline(
  repairRequestId: string
): Promise<RepairTimelineItem[]> {
  const response = await api.get(
    `/repair-requests/${repairRequestId}/timeline`
  );

  return response.data.data;
}

