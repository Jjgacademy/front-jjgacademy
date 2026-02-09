import { useState } from "react";
import { Link } from "react-router-dom";

const planes = [
  {
    nombre: "Básico",
    mensual: 15,
    anual: 150,
    comision: "10%",
    beneficios: [
      "1 comunidad",
      "Miembros ilimitados",
      "Subida de videos",
      "Certificados",
    ],
  },
  {
    nombre: "Pro",
    mensual: 39,
    anual: 390,
    comision: "5%",
    beneficios: [
      "Todo en Básico",
      "Marca personalizada",
      "Estadísticas",
      "Afiliados",
    ],
    destacado: true,
  },
  {
    nombre: "Premium",
    mensual: 79,
    anual: 790,
    comision: "2%",
    beneficios: [
      "Todo en Pro",
      "Dominio personalizado",
      "Soporte prioritario",
    ],
  },
];

export default function PlanComunidad() {
  const [tipoPago, setTipoPago] = useState("mensual");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold">
            Elige el plan de tu comunidad
          </h1>
          <p className="text-gray-200 mt-2">
            JJGACADEMY cobra solo una pequeña comisión por ayudarte a crecer.
          </p>
        </div>
      </header>

      {/* TOGGLE */}
      <div className="max-w-6xl mx-auto px-6 mt-8 flex justify-center">
        <div className="bg-white rounded-full shadow-sm border p-1 flex">
          <button
            onClick={() => setTipoPago("mensual")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
              tipoPago === "mensual"
                ? "bg-primary text-white"
                : "text-gray-600"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setTipoPago("anual")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
              tipoPago === "anual"
                ? "bg-primary text-white"
                : "text-gray-600"
            }`}
          >
            Anual (ahorra 2 meses)
          </button>
        </div>
      </div>

      {/* PLANES */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {planes.map((plan) => {
            const precio =
              tipoPago === "mensual" ? plan.mensual : plan.anual;

            return (
              <div
                key={plan.nombre}
                className={`bg-white border rounded-xl p-6 shadow-sm ${
                  plan.destacado ? "ring-2 ring-primary" : ""
                }`}
              >
                <h2 className="text-xl font-bold mb-2">
                  {plan.nombre}
                </h2>

                <p className="text-3xl font-bold text-primary mb-1">
                  ${precio}
                  <span className="text-base font-medium text-gray-600">
                    {" "}
                    / {tipoPago === "mensual" ? "mes" : "año"}
                  </span>
                </p>

                {tipoPago === "anual" && (
                  <p className="text-sm text-green-600 mb-2">
                    Ahorra ${plan.mensual * 12 - plan.anual} al año
                  </p>
                )}

                <p className="text-sm text-gray-600 mb-4">
                  Comisión JJGACADEMY: {plan.comision}
                </p>

                <ul className="space-y-2 mb-6">
                  {plan.beneficios.map((b) => (
                    <li key={b}>✅ {b}</li>
                  ))}
                </ul>

                <Link
                  to="/crear-comunidad/publicar"
                  className="block text-center bg-primary text-white py-2 rounded-md font-semibold hover:bg-secondary transition"
                >
                  Elegir plan
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
