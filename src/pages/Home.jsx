import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const comunidades = [
  {
    id: 1,
    slug: "jjgacademy",
    nombre: "JJGACADEMY",
    descripcion:
      "Comunidad oficial de formación, actualización y certificación profesional.",
    categoria: "Contabilidad",
    miembros: 587,
    precio: "Acceso premium",
  },
];

function getNombre(user) {
  if (!user) return "";
  // intenta sacar un nombre legible sin depender del backend
  return (
    user.nombres ||
    user.nombre ||
    user.name ||
    user.email ||
    "Mi cuenta"
  );
}

export default function Home() {
  const { user, logout } = useAuth();
  const nombre = getNombre(user);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-wide">
            JJGACADEMY
          </Link>

          {/* Derecha: Invitado vs Logueado */}
          {!user ? (
            <Link
              to="/login"
              className="bg-accent text-primary px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Iniciar sesión
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm opacity-90">
                Hola, <span className="font-semibold">{nombre}</span>
              </span>

              <Link
                to="/perfil"
                className="bg-white/10 px-3 py-2 rounded-md text-sm hover:bg-white/15 transition"
              >
                Perfil
              </Link>

              <Link
                to="/crear-comunidad"
                className="bg-accent text-primary px-4 py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                Crear comunidad
              </Link>

              <button
                onClick={logout}
                className="bg-white text-primary px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Descubre comunidades de aprendizaje profesional
        </h2>

        <p className="text-gray-600 mb-6 max-w-2xl">
          Aprende, actualízate y certifícate con expertos en comunidades
          especializadas.
        </p>

        {/* Buscador */}
        <div className="flex gap-3 max-w-xl">
          <input
            type="text"
            placeholder="Buscar comunidades, cursos o temas"
            className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-primary text-white px-6 rounded-md hover:opacity-95 transition">
            Buscar
          </button>
        </div>

        {/* Crear comunidad: si no hay sesión, te manda a login */}
        <div className="mt-4">
          <Link
            to={user ? "/crear-comunidad" : "/login"}
            className="text-blue-700 font-medium hover:underline"
          >
            Crear mi propia comunidad
          </Link>
          {!user && (
            <p className="text-sm text-gray-500 mt-1">
              Debes iniciar sesión para crear una comunidad.
            </p>
          )}
        </div>
      </section>

      {/* Comunidades */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-semibold mb-6">Comunidades destacadas</h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comunidades.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">{c.nombre}</h4>
                <p className="text-gray-600 mb-4">{c.descripcion}</p>

                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  <p>📚 {c.categoria}</p>
                  <p>👥 {c.miembros} miembros</p>
                  <p>💰 {c.precio}</p>
                </div>

                {/* IMPORTANTE: tu ruta real es /c/:slug */}
                <Link
                  to={`/c/${c.slug}`}
                  className="block text-center bg-primary text-white py-2 rounded-md font-medium hover:opacity-95 transition"
                >
                  Ver comunidad
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
