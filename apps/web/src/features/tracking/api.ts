import { api } from "@/lib/axios";
import type {
  TrackRepairResponse,
} from "./types";

export interface TrackRepairParams {
  ticketNumber: string;
  phoneNumber: string;
}

export async function trackRepair(
  params: TrackRepairParams
): Promise<TrackRepairResponse> {
  const { data } = await api.post<TrackRepairResponse>(
    "/repair-requests/track",
    params
  );

  return data;
}