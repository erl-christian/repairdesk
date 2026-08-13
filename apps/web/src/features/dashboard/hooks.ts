import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getRecentRepairRequests,
} from "./api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}

export function useRecentRepairRequests() {
  return useQuery({
    queryKey: ["recent-repair-requests"],
    queryFn: getRecentRepairRequests,
  });
}