import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import MisCursos from "./pages/MisCursos";
import CursoDetalle from "./pages/CursoDetalle";
import Comunidad from "./pages/Comunidad";

import CrearComunidad from "./pages/CrearComunidad";
import Planes from "./pages/Planes";
import PublicarComunidad from "./pages/PublicarComunidad";
import Perfil from "./pages/Perfil";
import Aula from "./pages/Aula";
import Exam from "./pages/Exam";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/c/:slug" element={<Comunidad />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />

      <Route path="/cursos" element={<Cursos />} />
      <Route path="/miscursos" element={<MisCursos />} />
      <Route path="/exam/:id" element={<Exam />} />

      {/* ✅ CAMBIO AQUÍ */}
      <Route path="/curso/:id" element={<CursoDetalle />} />

      <Route path="/aula" element={<Aula />} />

      <Route
        path="/crear-comunidad"
        element={
          <ProtectedRoute>
            <CrearComunidad />
          </ProtectedRoute>
        }
      />

      <Route
        path="/planes"
        element={
          <ProtectedRoute>
            <Planes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/crear-comunidad/publicar"
        element={
          <ProtectedRoute>
            <PublicarComunidad />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
