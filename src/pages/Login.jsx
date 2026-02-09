import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { loginRequest, registerRequest } from "../services/authService";

export default function Login() {
  const [modo, setModo] = useState("login");
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    dataPolicy: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* =========================
     🔐 LOGIN REAL
  ========================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginRequest(form.email, form.password);

      localStorage.setItem("token", res.token);
      login(res.user);

      navigate("/");
    } catch {
      setError("Correo o contraseña incorrectos");
    }
  };

  /* =========================
     🆕 REGISTRO REAL
  ========================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    if (!form.terms || !form.dataPolicy) {
      return setError("Debes aceptar los términos y la política de datos");
    }

    try {
      await registerRequest({
        name: `${form.nombres} ${form.apellidos}`,
        email: form.email,
        password: form.password,
        role: "student",
      });

      // auto login después del registro
      const loginRes = await loginRequest(form.email, form.password);

      localStorage.setItem("token", loginRes.token);
      login(loginRes.user);

      navigate("/");
    } catch {
      setError("Error creando la cuenta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 text-blue-700 font-medium hover:underline"
      >
        ← Volver al inicio
      </Link>

      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-primary">
          JJGACADEMY
        </h1>

        <p className="text-center text-sm text-gray-500 mb-6">
          Comunidades de aprendizaje profesional
        </p>

        <div className="flex mb-6 border-b">
          <button
            onClick={() => setModo("login")}
            className={`flex-1 pb-2 font-medium ${
              modo === "login"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-400"
            }`}
          >
            Iniciar sesión
          </button>

          <button
            onClick={() => setModo("register")}
            className={`flex-1 pb-2 font-medium ${
              modo === "register"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-400"
            }`}
          >
            Crear cuenta
          </button>
        </div>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
            {error}
          </p>
        )}

        {/* LOGIN */}
        {modo === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-blue-50 focus:outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-blue-50 focus:outline-none"
              required
            />

            <button className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:opacity-95">
              Iniciar sesión
            </button>
          </form>
        )}

        {/* REGISTRO */}
        {modo === "register" && (
          <form onSubmit={handleRegister} className="space-y-3">
            <input
              name="nombres"
              placeholder="Nombres completos"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border"
              required
            />

            <input
              name="apellidos"
              placeholder="Apellidos completos"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border"
              required
            />

            <input
              name="telefono"
              placeholder="Número de celular"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border"
              required
            />

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="terms" onChange={handleChange} />
              Acepto los términos y condiciones
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="dataPolicy"
                onChange={handleChange}
              />
              Acepto la ley de protección de datos
            </label>

            <button className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:opacity-95">
              Crear cuenta
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          Plataforma educativa de JJGACADEMY
        </p>
      </div>
    </div>
  );
}
