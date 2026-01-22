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
 * 🔹 Descargar certificado en PDF
 * ✅ Valida token antes de descargar
 */
export async function downloadCertificate(courseId) {
  const token = localStorage.getItem("token");

  // 🔒 VALIDACIÓN CLAVE
  if (!token) {
    throw new Error(
      "Tu sesión ha expirado. Cierra sesión e inicia sesión nuevamente."
    );
  }

  const res = await fetch(
    `https://jjgacademy.com/api/api/certificates/${courseId}/download`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // 🟡 El certificado aún no existe
  if (res.status === 404) {
    throw new Error(
      "El certificado aún no está disponible. Intenta nuevamente en unos segundos."
    );
  }

  // 🔴 Otros errores reales
  if (!res.ok) {
    throw new Error("No se pudo descargar el certificado");
  }

  // ✅ Descargar archivo
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
