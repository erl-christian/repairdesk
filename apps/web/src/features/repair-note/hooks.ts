import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createRepairNote,
  getRepairNotes,
} from "./api";

import type {
  CreateRepairNotePayload,
} from "./types";

export function useRepairNotes(
  repairRequestId: string
) {
  return useQuery({
    queryKey: [
      "repair-notes",
      repairRequestId,
    ],
    queryFn: () =>
      getRepairNotes(repairRequestId),
    enabled: Boolean(repairRequestId),
  });
}

export function useCreateRepairNote(
  repairRequestId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateRepairNotePayload
    ) =>
      createRepairNote(
        repairRequestId,
        payload
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "repair-notes",
          repairRequestId,
        ],
      });
    },
  });
}