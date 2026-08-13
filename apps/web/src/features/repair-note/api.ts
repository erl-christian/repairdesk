import { api } from "@/lib/axios";

import type {
  CreateRepairNotePayload,
  CreateRepairNoteResponse,
  RepairNotesResponse,
} from "./types";

export async function getRepairNotes(
  repairRequestId: string
) {
  const { data } = await api.get<RepairNotesResponse>(
    `/repair-requests/${repairRequestId}/notes`
  );

  return data.data;
}

export async function createRepairNote(
  repairRequestId: string,
  payload: CreateRepairNotePayload
) {
  const { data } =
    await api.post<CreateRepairNoteResponse>(
      `/repair-requests/${repairRequestId}/notes`,
      payload
    );

  return data.data;
}