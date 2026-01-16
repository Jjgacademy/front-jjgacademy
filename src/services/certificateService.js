import { apiRequest } from "./api";

/**
 * 🔹 Crear certificado (solo una vez)
 */
export async function createCertificate(data) {
  return await apiRequest("/certificates", "POST", data);
}

/**
 * 🔹 Obtener certificado del usuario por curso
 */
export async function getCertificate(courseId) {
  return await apiRequest(`/certificates/${courseId}`, "GET");
}

/**
 * 🔹 Descargar certificado en PDF (cuando quiera)
 */
export async function downloadCertificate(courseId) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://jjgacademy.com/api/api/certificates/${courseId}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error descargando certificado");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "certificado.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
}
