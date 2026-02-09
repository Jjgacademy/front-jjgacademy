import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrearComunidad() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [slug, setSlug] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [acceso, setAcceso] = useState("pago");

  const generarSlug = (texto) =>
    texto
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleContinuar = (e) => {
    e.preventDefault();

    if (!nombre || !slug || !descripcion || !categoria) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    const comunidad = {
      nombre,
      slug,
      descripcion,
      categoria,
      acceso,
    };

    localStorage.setItem("nueva_comunidad", JSON.stringify(comunidad));

    navigate("/planes");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Crear mi propia comunidad
          </h1>
          <p className="text-blue-100">
            Lanza tu comunidad, sube cursos y monetiza tu conocimiento.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleContinuar}
        className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow mt-10"
      >
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-1">
              Nombre de la comunidad
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setSlug(generarSlug(e.target.value));
              }}
              className="w-full border px-4 py-3 rounded-md"
              placeholder="Ej: Conexión Contable"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              URL de la comunidad
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border px-4 py-3 rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">
              jjgacademy.com/c/{slug || "tu-comunidad"}
            </p>
          </div>

          <div>
            <label className="block font-medium mb-1">
              ¿De qué trata la comunidad?
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border px-4 py-3 rounded-md"
              rows="4"
              placeholder="Describe el propósito de tu comunidad"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Categoría
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border px-4 py-3 rounded-md"
            >
              <option value="">Selecciona una categoría</option>
              <option value="Contabilidad">Contabilidad</option>
              <option value="Tributación">Tributación</option>
              <option value="Excel">Excel</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Educación">Educación</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Tipo de acceso
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={acceso === "gratis"}
                  onChange={() => setAcceso("gratis")}
                />
                Gratis
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={acceso === "pago"}
                  onChange={() => setAcceso("pago")}
                />
                De pago
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-blue-900 transition"
          >
            Continuar y elegir plan
          </button>
        </div>
      </form>
    </div>
  );
}
