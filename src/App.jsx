import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import MisCursos from "./pages/MisCursos";
import CursoDetalle from "./pages/CursoDetalle";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/login" element={<Login />} />

        {/* Mis cursos */}
        <Route path="/miscursos" element={<MisCursos />} />

        {/* Curso individual */}
        <Route path="/curso/:id" element={<CursoDetalle />} />
      </Routes>
    </>
  );
}
