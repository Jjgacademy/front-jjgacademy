import { useParams, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  console.log("Curso ID:", id);

  // 🎥 Videos
  const [videos, setVideos] = useState([]);
  // 🔧 ADMIN VIDEO
  const [mostrarFormVideo, setMostrarFormVideo] = useState(false);
  const [nuevoVideo, setNuevoVideo] = useState({
    title: "",
    url: "",
  });

  // ⚠️ luego lo conectamos con roles reales
  const esAdmin = true;
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // 📁 Material
  const [materials, setMaterials] = useState([]);

  // 🎓 Certificado
  const [certificate, setCertificate] = useState(null);
  const [examPassed, setExamPassed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [loadingCert, setLoadingCert] = useState(true);

  // 🔹 Cargar datos del curso
  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        // 🎥 videos
        const vids = await getVideosByCourse(id);
        setVideos(vids);
        if (vids.length > 0) setCurrentVideo(vids[0]);

        // 📁 materiales
        const mats = await getMaterialsByCourse(id);
        setMaterials(mats);

        // 🎓 certificado
        const cert = await getCertificate(id);
        if (cert) setCertificate(cert);

        // ✅ verificar si aprobó examen
        const res = await fetch(
          `https://jjgacademy.com/api/exam/result/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (res.ok) {
          const data = await res.json();
          setExamPassed(data.aprobado === true);
        }
      } catch (error) {
        console.error("Error cargando datos", error);
      } finally {
        setLoadingVideos(false);
        setLoadingCert(false);
      }
    }

    loadData();
  }, [id]);

  // 🔹 Generar certificado (SIN CONDICIONES)
  const handleCreateCertificate = async () => {
    if (!fullName.trim()) {
      alert("Ingresa tu nombre completo");
      return;
    }

    if (!city) {
      alert("Selecciona la ciudad");
      return;
    }

    try {
      const payload = {
        course_id: Number(id),
        full_name: fullName.trim(),
        city,
      };

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
        <div className="flex justify-between items-center mb-3">
          <h3>🎥 Videos del curso</h3>

          {esAdmin && (
            <button
              onClick={() => setMostrarFormVideo(true)}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm"
            >
              + Agregar video
            </button>
          )}
        </div>
        {mostrarFormVideo && (
          <div className="certificate-form" style={{ marginBottom: "20px" }}>
            <input
              placeholder="Título del video"
              value={nuevoVideo.title}
              onChange={(e) =>
                setNuevoVideo({ ...nuevoVideo, title: e.target.value })
              }
            />

            <input
              placeholder="URL Vimeo embed"
              value={nuevoVideo.url}
              onChange={(e) =>
                setNuevoVideo({ ...nuevoVideo, url: e.target.value })
              }
            />

            <button
              onClick={async () => {
                await fetch("http://localhost:25060/api/videos", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: nuevoVideo.title,
                    video_url: nuevoVideo.url,
                    course_id: Number(id),
                  }),
                });

                setMostrarFormVideo(false);

                // recargar videos
                const vids = await getVideosByCourse(id);
                setVideos(vids);
                if (vids.length > 0) setCurrentVideo(vids[0]);
              }}
            >
              Guardar video
            </button>
          </div>
        )}

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
              <div
                className="video-item exam-button"
                onClick={() => navigate(`/exam/${id}`)}
              >
                📝 Dar examen final
              </div>
            </div>
          </div>
        )}
        {/* 🎓 CERTIFICADO */}
        {!loadingCert && (
          <>
            <h3 style={{ marginTop: "40px" }}>🎓 Certificado</h3>

            {!examPassed ? (
              <p style={{ color: "red" }}>
                Debes aprobar el examen para generar el certificado.
              </p>
            ) : !certificate ? (
              <div className="certificate-form">
                <input
                  type="text"
                  placeholder="Nombre completo para el certificado"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Selecciona ciudad</option>
                  <option value="quito">Quito</option>
                  <option value="guayaquil">Guayaquil</option>
                  <option value="cuenca">Cuenca</option>
                </select>

                <button onClick={handleCreateCertificate}>
                  Generar certificado
                </button>
              </div>
            ) : (
              <div className="certificate-card">
                <button
                  className="certificate-download-btn"
                  onClick={async () => {
                    try {
                      await downloadCertificate(id);
                    } catch (err) {
                      alert(err.message);
                    }
                  }}
                >
                  ⬇ Descargar certificado en PDF
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
