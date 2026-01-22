import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getVideosByCourse } from "../services/videoService";
import { getMaterialsByCourse } from "../services/materialService";
import {
  createCertificate,
  getCertificate,
  downloadCertificate,
} from "../services/certificateService";

import "../css/cursoDetalle.css";

export default function CursoDetalle() {
  const { id } = useParams();

  // 👉 SOLO el curso Cierre Fiscal exige ciudad (id = 3)
  const isCierreFiscal = Number(id) === 3;

  // 🎥 Videos
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // 📁 Material
  const [materials, setMaterials] = useState([]);

  // 🎓 Certificado
  const [certificate, setCertificate] = useState(null);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [loadingCert, setLoadingCert] = useState(true);

  // 🔹 LIMPIAR CIUDAD CUANDO NO ES CIERRE FISCAL (CAMBIO CLAVE)
  useEffect(() => {
    if (!isCierreFiscal) {
      setCity("");
    }
  }, [id, isCierreFiscal]);

  // 🔹 Cargar datos del curso
  useEffect(() => {
    async function loadData() {
      try {
        const vids = await getVideosByCourse(id);
        setVideos(vids);
        if (vids.length > 0) setCurrentVideo(vids[0]);

        const mats = await getMaterialsByCourse(id);
        setMaterials(mats);

        const cert = await getCertificate(id);
        if (cert) setCertificate(cert);
      } catch (error) {
        console.error("Error cargando datos", error);
      } finally {
        setLoadingVideos(false);
        setLoadingCert(false);
      }
    }

    loadData();
  }, [id]);

  // 🔹 Generar certificado
  const handleCreateCertificate = async () => {
    if (!fullName.trim()) {
      alert("Ingresa tu nombre completo");
      return;
    }

    if (isCierreFiscal && !city) {
      alert("Selecciona la ciudad");
      return;
    }

    try {
      const payload = {
        course_id: Number(id),
        full_name: fullName.trim(),
      };

      if (isCierreFiscal) {
        payload.city = city;
      }

      const cert = await createCertificate(payload);
      setCertificate(cert);

      alert("Certificado generado correctamente");
    } catch (error) {
      alert(error?.message || "Error guardando certificado");
    }
  };

  return (
    <div className="curso-detalle">
      <div className="curso-banner">
        <h1>Curso #{id}</h1>
      </div>

      <div className="curso-content">
        <h3>🎥 Videos del curso</h3>

        {loadingVideos && <p>Cargando videos...</p>}

        {!loadingVideos && videos.length === 0 && (
          <p>Este curso aún no tiene videos disponibles.</p>
        )}

        {!loadingVideos && videos.length > 0 && currentVideo && (
          <div className="curso-layout">
            <div className="video-player">
              <iframe
                src={currentVideo.video_url}
                title={currentVideo.title}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            <div className="video-list">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`video-item ${
                    currentVideo.id === video.id ? "active" : ""
                  }`}
                  onClick={() => setCurrentVideo(video)}
                >
                  ▶ {video.title}
                </div>
              ))}

              {materials.map((mat) => (
                <a
                  key={mat.id}
                  href={mat.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-item material"
                >
                  📁 {mat.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {!loadingCert && (
          <>
            <h3 style={{ marginTop: "40px" }}>🎓 Certificado</h3>

            {!certificate ? (
              <div className="certificate-form">
                <input
                  type="text"
                  placeholder="Nombre completo para el certificado"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                {/* ✅ SOLO aparece en Cierre Fiscal */}
                {isCierreFiscal && (
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Selecciona ciudad</option>
                    <option value="quito">Quito</option>
                    <option value="guayaquil">Guayaquil</option>
                    <option value="cuenca">Cuenca</option>
                  </select>
                )}

                <button onClick={handleCreateCertificate}>
                  Generar certificado
                </button>
              </div>
            ) : (
              <div className="certificate-card">
                <div className="certificate-header">
                  🎓 Certificado del curso
                </div>

                <div className="certificate-body">
                  <p className="certificate-item">
                    ✔ Certificado registrado a nombre de
                    <strong> {certificate.full_name}</strong>
                  </p>

                  {certificate.city && (
                    <p className="certificate-item">
                      📍 Ciudad:
                      <strong> {certificate.city}</strong>
                    </p>
                  )}

                  <button
                    className="certificate-download-btn"
                    onClick={() => downloadCertificate(id)}
                  >
                    ⬇ Descargar certificado en PDF
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
