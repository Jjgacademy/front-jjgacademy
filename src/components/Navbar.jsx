import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../css/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" className="logo" />
      </div>

      <div className="navbar-links">

        {/* SI ESTÁ LOGUEADO */}
        {user ? (
          <>
            <Link to="/">Inicio</Link>
            <Link to="/cursos">Nuestros Cursos</Link>
            <Link to="/miscursos">Mis Cursos</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          /* SI NO ESTÁ LOGUEADO */
          <>
            <Link to="/">Inicio</Link>
            <Link to="/cursos">Cursos</Link>
            <Link to="/login">Login</Link>
          </>
        )}

      </div>
    </nav>
  );
}
