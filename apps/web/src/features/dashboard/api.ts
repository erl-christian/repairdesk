import { api } from "@/lib/axios";
import type {
  DashboardStatsResponse,
  RepairRequestsResponse,
} from "./types";

export async function getDashboardStats() {
  const { data } = await api.get<DashboardStatsResponse>(
    "/dashboard/stats"
  );

  return data.data;
}

export async function getRecentRepairRequests() {
  const { data } = await api.get<RepairRequestsResponse>(
    "/repair-requests?page=1&limit=5"
  );

  return data.repairRequests;
}