import { apiRequest } from "./api";

export async function loginRequest(email, password) {
  return await apiRequest("/auth/login", "POST", {
    email,
    password,
  });
}

export async function registerRequest(data) {
  return await apiRequest("/auth/register", "POST", data);
}
