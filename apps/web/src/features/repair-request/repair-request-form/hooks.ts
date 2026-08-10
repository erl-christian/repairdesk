import { useMutation } from "@tanstack/react-query";

import { createRepairRequest } from "./api";

export function useCreateRepairRequest() {
  return useMutation({
    mutationFn: createRepairRequest,
  });
}