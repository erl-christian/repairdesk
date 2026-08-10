import { api } from "@/lib/axios";

import type {
  CreateRepairRequestData,
  CreateRepairRequestResponse,
} from "./types";

export async function createRepairRequest(
  data: CreateRepairRequestData
): Promise<CreateRepairRequestResponse> {
  const response = await api.post<CreateRepairRequestResponse>(
    "/repair-requests",
    data
  );

  return response.data;
}