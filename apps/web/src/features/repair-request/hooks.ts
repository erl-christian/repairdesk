import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import { getRepairRequests } from "./api";

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