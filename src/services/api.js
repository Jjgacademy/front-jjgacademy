const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  console.log("API_URL:", API_URL);
  console.log("TOKEN ENVIADO:", token);

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log("HEADERS:", headers);

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
}
