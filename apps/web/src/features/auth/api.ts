import { api } from "@/lib/axios";

import type {
  LoginPayload,
  LoginResponse,
} from "./types";

export async function loginAdmin(
  payload: LoginPayload
) {
  const { data } = await api.post<LoginResponse>(
    "/auth/login",
    payload
  );

  return data;
}