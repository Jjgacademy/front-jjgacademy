import { useEffect, useState } from "react";
import "../css/miscursos.css";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function MisCursos() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadCursos() {
      try {
        let currentUser = user;

        // Si no viene del contexto → buscar en localStorage
        if (!currentUser) {
          const stored = localStorage.getItem("user");
          if (stored) currentUser = JSON.parse(stored);
        }

        console.log("🔥 USER EN MISCURSOS ===>", currentUser);

        if (!currentUser) return;

        let url = "";

        // 🔥 ADMIN → ver TODOS los cursos
        if (currentUser.role === "admin") {
          url = "http://174.138.84.230/api/courses/all";
        }

        // 🔥 Usuario normal → solo sus cursos asignados
        else {
          url = `http://174.138.84.230/api/courses/user/${currentUser.id}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        console.log("📚 Cursos recibidos:", data);

        setCursos(data);

      } catch (err) {
        console.log("❌ Error cargando cursos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCursos();

  }, [user]);

  return (
    <div className="mis-cursos">

      <h1>🎓 Mis Cursos</h1>

      {loading ? (
        <p>Cargando cursos...</p>
      ) : (
        <div className="cursos-grid">
          {cursos.length === 0 ? (
            <p>No tienes cursos asignados aún.</p>
          ) : (
            cursos.map((curso) => (
              <div
                key={curso.id}
                className="curso-card"
                onClick={() => navigate(`/curso/${curso.id}`)}
              >
                <div className="curso-overlay">
                  <h3>{curso.title || curso.name}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
