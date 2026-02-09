import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Planes() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState("mensual"); // mensual | anual

  const comunidad = useMemo(() => {
    const data = localStorage.getItem("nueva_comunidad");
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  // ✅ redirección en effect (no en render)
  useEffect(() => {
    if (!comunidad) navigate("/crear-comunidad", { replace: true });
  }, [comunidad, navigate]);

  if (!comunidad) return null;

  const precios = {
    basico: { mensual: 15, anual: 144, comision: "10%" },
    pro: { mensual: 39, anual: 374, comision: "5%" },
    premium: { mensual: 79, anual: 758, comision: "2%" },
  };

  const elegirPlan = (plan) => {
    const seleccion = {
      plan,
      billing,
      precio: billing === "mensual" ? precios[plan].mensual : precios[plan].anual,
      comision: precios[plan].comision,
    };

    localStorage.setItem(
      "nueva_comunidad",
      JSON.stringify({ ...comunidad, plan: seleccion })
    );

    // ✅ ruta correcta
    navigate("/crear-comunidad/publicar");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-10 text-center">
        <h1 className="text-3xl font-bold">Elige el plan de tu comunidad</h1>
        <p className="mt-2 text-gray-200">
          JJGACADEMY cobra solo una pequeña comisión por ayudarte a crecer.
        </p>

        <div className="mt-6 inline-flex bg-white rounded-lg p-1">
          <button
            onClick={() => setBilling("mensual")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              billing === "mensual" ? "bg-primary text-white" : "text-gray-600"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBilling("anual")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              billing === "anual" ? "bg-primary text-white" : "text-gray-600"
            }`}
          >
            Anual (-20%)
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <PlanCard
          titulo="Básico"
          precio={billing === "mensual" ? "$15 / mes" : "$144 / año"}
          comision="10%"
          features={["1 comunidad", "Miembros ilimitados", "Subida de videos", "Certificados"]}
          onSelect={() => elegirPlan("basico")}
        />

        <PlanCard
          destacado
          titulo="Pro"
          precio={billing === "mensual" ? "$39 / mes" : "$374 / año"}
          comision="5%"
          features={["Todo en Básico", "Marca personalizada", "Estadísticas", "Afiliados"]}
          onSelect={() => elegirPlan("pro")}
        />

        <PlanCard
          titulo="Premium"
          precio={billing === "mensual" ? "$79 / mes" : "$758 / año"}
          comision="2%"
          features={["Todo en Pro", "Dominio personalizado", "Soporte prioritario"]}
          onSelect={() => elegirPlan("premium")}
        />
      </section>
    </div>
  );
}

function PlanCard({ titulo, precio, comision, features, onSelect, destacado }) {
  return (
    <div
      className={`bg-white rounded-xl p-6 flex flex-col ${
        destacado ? "border-2 border-primary shadow-md" : "border shadow-sm"
      }`}
    >
      <h2 className="text-xl font-bold mb-2">{titulo}</h2>
      <p className="text-3xl font-bold mb-1">{precio}</p>
      <p className="text-sm text-gray-500 mb-4">Comisión JJGACADEMY: {comision}</p>

      <ul className="space-y-2 text-sm mb-6">
        {features.map((f) => (
          <li key={f}>✅ {f}</li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className="mt-auto bg-primary text-white py-2 rounded-md hover:bg-secondary transition"
      >
        Elegir plan
      </button>
    </div>
  );
}
