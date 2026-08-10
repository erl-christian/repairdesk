import { useQuery } from "@tanstack/react-query";
import { trackRepair } from "./api";

export function useTrackRepair(
  ticketNumber: string,
  phoneNumber: string,
  enabled: boolean
) {
  return useQuery({
    queryKey: [
      "track-repair",
      ticketNumber,
      phoneNumber,
    ],

    queryFn: () =>
      trackRepair({
        ticketNumber,
        phoneNumber,
      }),

    enabled:
      enabled &&
      Boolean(ticketNumber) &&
      Boolean(phoneNumber),

    retry: false,
  });
}