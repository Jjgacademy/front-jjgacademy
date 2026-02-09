import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicarComunidad() {
  const navigate = useNavigate();

  const comunidad = useMemo(() => {
    const data = localStorage.getItem("nueva_comunidad");
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  // ✅ si no hay data, redirige en effect
  useEffect(() => {
    if (!comunidad) navigate("/crear-comunidad", { replace: true });
  }, [comunidad, navigate]);

  if (!comunidad) return null;

  const plan = comunidad.plan;

  const publicar = () => {
    // Aquí luego va backend
    console.log("Publicando comunidad:", comunidad);

    // Simula publicación: guarda en lista de comunidades (demo)
    const existentes = JSON.parse(localStorage.getItem("comunidades") || "[]");
    localStorage.setItem("comunidades", JSON.stringify([comunidad, ...existentes]));

    // limpia borrador
    localStorage.removeItem("nueva_comunidad");

    // ir a comunidad
    navigate(`/c/${comunidad.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Publicar comunidad</h1>
          <p className="mt-2 text-blue-100">Revisa la información antes de publicar</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">{comunidad.nombre}</h2>
          <p className="text-gray-600">{comunidad.descripcion}</p>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Categoría:</span> {comunidad.categoria}
            </div>
            <div>
              <span className="font-medium">URL:</span> jjgacademy.com/c/{comunidad.slug}
            </div>

            {plan ? (
              <>
                <div>
                  <span className="font-medium">Plan:</span> {plan.plan.toUpperCase()}
                </div>
                <div>
                  <span className="font-medium">Cobro:</span> {plan.billing} (${plan.precio})
                </div>
                <div>
                  <span className="font-medium">Comisión JJGACADEMY:</span> {plan.comision}
                </div>
              </>
            ) : (
              <div className="sm:col-span-2 text-red-600">
                No hay plan seleccionado. Vuelve a “Planes”.
              </div>
            )}
          </div>

          <div className="pt-6 flex gap-4">
            <button
              onClick={() => navigate("/planes")}
              className="px-6 py-2 border rounded-md hover:bg-gray-100"
            >
              Volver
            </button>

            <button
              onClick={publicar}
              disabled={!plan}
              className={`px-6 py-2 rounded-md text-white ${
                plan ? "bg-primary hover:bg-secondary" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Publicar comunidad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
