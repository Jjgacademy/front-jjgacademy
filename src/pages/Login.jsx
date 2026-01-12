import { useState } from "react";
import "../css/login.css";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al iniciar sesión");
        return;
      }

      console.log("🔥 LOGIN OK:", data);

      // Guardar token si quieres usarlo luego
      localStorage.setItem("token", data.token);

      // Guardar usuario en contexto (IMPORTANTE para MisCursos)
      login(data.user);

      navigate("/miscursos"); // Redirigir a Mis Cursos

    } catch (err) {
      console.log(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Iniciar sesión</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Ingresar</button>
        </form>

      </div>
    </div>
  );
}
