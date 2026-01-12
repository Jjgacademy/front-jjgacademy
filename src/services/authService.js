import { apiRequest } from "./api";

export async function loginRequest(email, password) {
  return await apiRequest("/auth/login", "POST", { email, password });
}
