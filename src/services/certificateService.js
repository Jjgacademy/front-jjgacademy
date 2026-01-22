/**
 * 🔹 Crear certificado (ARREGLADO AQUÍ MISMO)
 * 👉 NO usamos apiRequest para evitar /api/api
 */
export async function createCertificate(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "https://jjgacademy.com/api/certificates",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Error creando certificado");
  }

  return result;
}

/**
 * 🔹 Obtener certificado del usuario por curso
 * (también evitamos apiRequest aquí)
 */
export async function getCertificate(courseId) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://jjgacademy.com/api/certificates/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) return null;

  return await res.json();
}

/**
 * 🔹 Descargar certificado en PDF
 * 👉 QUITADO /api/api
 */
export async function downloadCertificate(courseId) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `https://jjgacademy.com/api/certificates/${courseId}/download`,
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
