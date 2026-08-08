import { api } from "@/lib/axios";

import type {
  GetRepairRequestsParams,
  RepairRequestsResponse,
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