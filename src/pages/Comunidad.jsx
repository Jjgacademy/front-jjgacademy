import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { apiRequest } from "../services/api";
import interactionPlugin from "@fullcalendar/interaction";

/* ===== MAPA ===== */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Comunidad() {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("Todo");
  const [tab, setTab] = useState("Comunidad");

  // ===== AULA DESDE BACKEND =====
  const [modulosAula, setModulosAula] = useState([]);

  useEffect(() => {
    const cargarAula = async () => {
      try {
        const data = await apiRequest("/communities/jjgacademy");
        setModulosAula(data.courses || []);
      } catch (error) {
        console.error("Error cargando aula:", error);
      }
    };

    cargarAula();
  }, []);

  /* ================= ADMIN (AGREGADO) ================= */
  // Luego lo reemplazas por tu rol real (desde token / backend)
  const [esAdminComunidad, setEsAdminComunidad] = useState(true);
  const [adminSeccion, setAdminSeccion] = useState("Dashboard");
  /* ==================================================== */

  const filtros = [
    "Todo",
    "Servicio de Rentas Internas",
    "IESS",
    "Ministerio de Trabajo",
    "Consejos Tributarios",
    "Más...",
  ];

  /* ================= CALENDARIO ================= */

  const [eventos, setEventos] = useState([
    {
      title: "Mentoría en vivo",
      date: "2026-01-30",
      color: "#2563eb",
    },
    {
      title: "Subida de video: IVA",
      date: "2026-01-31",
      color: "#16a34a",
    },
  ]);

  const handleDateClick = (info) => {
    const titulo = prompt("¿Qué evento deseas agregar?");
    if (titulo) {
      setEventos([
        ...eventos,
        {
          title: titulo,
          date: info.dateStr,
          color: "#facc15",
        },
      ]);
    }
  };

  /* ================= MIEMBROS ================= */

  const miembros = [
    {
      id: 1,
      nombre: "Johan Pavón",
      usuario: "@johan-pavon-5894",
      rol: "Administrador",
      online: true,
      fecha: "26 de enero de 2026",
      lat: -0.1807,
      lng: -78.4678,
    },
    {
      id: 2,
      nombre: "Michelle Relica",
      usuario: "@michelle-relica-9278",
      rol: "Miembro",
      online: true,
      fecha: "29 de octubre de 2025",
      lat: -12.0464,
      lng: -77.0428,
    },
    {
      id: 3,
      nombre: "Edda Mendoza Medranda",
      usuario: "@edda-mendoza-3937",
      rol: "Contador-Bachiller",
      online: true,
      fecha: "12 de septiembre de 2025",
      lat: -34.6037,
      lng: -58.3816,
    },
  ];

  /* ================= CLASIFICACIÓN (AGREGADO) ================= */

  const ranking = [
    {
      id: 1,
      nombre: "Johan Pavón",
      usuario: "@johan-pavon-5894",
      puntos: 950,
      nivel: "Oro",
    },
    {
      id: 2,
      nombre: "Michelle Relica",
      usuario: "@michelle-relica-9278",
      puntos: 820,
      nivel: "Plata",
    },
    {
      id: 3,
      nombre: "Edda Mendoza Medranda",
      usuario: "@edda-mendoza-3937",
      puntos: 780,
      nivel: "Bronce",
    },
  ];

  /* ================= ACERCA DE (AGREGADO) ================= */

  const acercaDe = {
    imagen:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=60",
    descripcion:
      "☝🏽 SE PARTE DE NUESTRA COMUNIDAD Y CREZCAMOS JUNTOS EN CONOCIMIENTO Y EXPERIENCIA ☝🏽\n\n¿Qué beneficios tienes al ser parte de CONEXIÓN-CONTABLE?\n💰 Más de 52 Cursos Grabados 100% Actualizados en Contabilidad - Impuestos - Derecho - Finanzas - Laboral\n🎥 Más de 200 horas de grabación (Valorado en US $1,997,00)\n📌 Actualizaciones Tributarias - Nuevos Cursos Grabados todos los meses (Normalmente se venden por US $197,00 por mes)\n📞 Llamada Grupal donde Contestaremos inquietudes en vivo (Normalmente se vende por $97 por mes)\n🎁 Bonus: Acceso a Nuestra Comunidad VIP en un Grupo de Whatsapp donde todos los miembros compartiremos información (Invaluable)\n🎁 Bonus: Networking con más contadores-tributaristas-financieros-abogados (Invaluable)\n\nValor total: US $2.997,00 | Hoy por $97 Mensuales o Un Pago Anual de 497!\nEl precio en el que entres se mantiene para siempre.\n\n👉 Únete a CONEXIONCONTABLE y comienza a ser un experto contable-tributario-financiero",
    privacidad: "Privado",
    miembros: 580,
    precio: "$497/año",
    dueno: "Esteban Jácome",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HEADER ================= */}
      <header className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-bold text-lg">JJGACADEMY</div>

          <div className="flex items-center gap-4 text-sm">
            <span>Hola, Admin</span>

            {/* (AGREGADO) switch solo para probar en front */}
            <button
              className="bg-white/10 px-3 py-1 rounded-md"
              onClick={() => setEsAdminComunidad((v) => !v)}
              title="Solo demo: alternar admin"
            >
              {esAdminComunidad ? "Admin: ON" : "Admin: OFF"}
            </button>

            <button className="bg-white/10 px-3 py-1 rounded-md">Perfil</button>
            <button className="bg-white text-primary px-3 py-1 rounded-md">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* ================= NAV ================= */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 flex gap-6 text-sm">
          {[
            "Comunidad",
            "Aula",
            "Calendario",
            "Miembros",
            "Mapa",
            "Clasificación",
            "Acerca de",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`py-3 border-b-2 ${
                tab === item
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}

          {/* ================= ADMIN TAB (AGREGADO) ================= */}
          {esAdminComunidad && (
            <button
              onClick={() => setTab("Admin")}
              className={`py-3 border-b-2 ${
                tab === "Admin"
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Admin
            </button>
          )}
          {/* ======================================================== */}
        </div>
      </nav>

      {/* ================= CONTENIDO ================= */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* ============ COMUNIDAD ============ */}
        {tab === "Comunidad" && (
          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-8 space-y-4">
              <div className="border rounded-xl p-4">
                <input
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Escribe algo..."
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {filtros.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltro(f)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filtro === f
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <Post
                autor="Esteban Jácome"
                tiempo="3 horas"
                categoria="Servicio de Rentas Internas"
                titulo="Atención Grandes Contribuyentes"
                contenido="El SRI emitió una nueva resolución que actualiza los porcentajes de autorretención."
              />

              <Post
                autor="Esteban Jácome"
                tiempo="2 días"
                categoria="Consejos Tributarios"
                titulo="¿Tienes problemas al declarar?"
                contenido="Te explicamos cómo declarar correctamente IVA, retenciones, ISD e Impuesto a la Renta."
              />
            </section>

            <aside className="col-span-4">
              <Sidebar />
            </aside>
          </div>
        )}

        {/* ============ AULA ============ */}
        {tab === "Aula" && (
          <div className="grid md:grid-cols-3 gap-6">
            {modulosAula.map((curso) => (
              <div
                key={curso.id}
                onClick={() => navigate(`/curso/${curso.id}`)}
                className="bg-[#2f2f2f] text-white rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition"
              >
                <div className="h-36 bg-primary flex items-center justify-center font-semibold text-center px-3">
                  {curso.title}
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-300">
                    Curso disponible en la comunidad
                  </p>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `0%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-400">0% completado</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============ CALENDARIO ============ */}
        {tab === "Calendario" && (
          <div className="bg-white border rounded-xl p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale="es"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={eventos}
              dateClick={handleDateClick}
              height="auto"
            />
          </div>
        )}

        {/* ============ MIEMBROS ============ */}
        {tab === "Miembros" && (
          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-8 space-y-4">
              {miembros.map((m) => (
                <MemberRow key={m.id} miembro={m} />
              ))}
            </section>
          </div>
        )}

        {/* ============ MAPA ============ */}
        {tab === "Mapa" && (
          <div className="bg-white border rounded-xl p-4 h-[520px]">
            <MapaUsuarios miembros={miembros} />
          </div>
        )}

        {/* ============ CLASIFICACIÓN ============ */}
        {tab === "Clasificación" && <ClasificacionTabla ranking={ranking} />}

        {/* ============ ACERCA DE (AGREGADO) ============ */}
        {tab === "Acerca de" && <AcercaDeComunidad acercaDe={acercaDe} />}

        {/* ================= ADMIN (AGREGADO) ================= */}
        {tab === "Admin" && esAdminComunidad && (
          <AdminPanel
            adminSeccion={adminSeccion}
            setAdminSeccion={setAdminSeccion}
          />
        )}
        {/* =================================================== */}
      </main>
    </div>
  );
}

/* ================= COMPONENTES ================= */

function Post({ autor, tiempo, categoria, titulo, contenido }) {
  return (
    <div className="border rounded-xl p-4 space-y-2">
      <div className="text-sm text-gray-500">
        <strong>{autor}</strong> · {tiempo} · {categoria}
      </div>
      <h4 className="font-semibold">{titulo}</h4>
      <p className="text-sm text-gray-700">{contenido}</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="border rounded-xl p-5 space-y-4">
      <h3 className="text-lg font-semibold">ConexiónContable</h3>
      <p className="text-sm text-gray-600">
        Tu comunidad para aprender y compartir conocimiento.
      </p>
    </div>
  );
}

function MemberRow({ miembro }) {
  return (
    <div className="bg-gray-100 border rounded-xl p-4 flex justify-between">
      <div>
        <p className="font-medium">{miembro.nombre}</p>
        <p className="text-xs text-gray-500">{miembro.usuario}</p>
        <p className="text-xs">{miembro.rol}</p>
      </div>
      <button className="border px-4 py-1 rounded-md">CHARLAR</button>
    </div>
  );
}

/* ================= CLASIFICACIÓN ================= */

function ClasificacionTabla({ ranking }) {
  return (
    <div className="border rounded-xl p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Clasificación</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="text-left py-2">#</th>
            <th className="text-left">Usuario</th>
            <th className="text-left">Nivel</th>
            <th className="text-left">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r, index) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-semibold">#{index + 1}</td>
              <td>
                <div className="font-medium">{r.nombre}</div>
                <div className="text-xs text-gray-500">{r.usuario}</div>
              </td>
              <td>{r.nivel}</td>
              <td className="font-semibold">{r.puntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= ACERCA DE (AGREGADO) ================= */

function AcercaDeComunidad({ acercaDe }) {
  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-xl overflow-hidden">
        <img
          src={acercaDe.imagen}
          alt="Imagen comunidad"
          className="w-full h-56 object-cover"
        />
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <span className="inline-flex items-center gap-2">
              🔒 <strong>{acercaDe.privacidad}</strong>
            </span>
            <span className="inline-flex items-center gap-2">
              👥 <strong>{acercaDe.miembros}</strong> miembros
            </span>
            <span className="inline-flex items-center gap-2">
              🏷️ <strong>{acercaDe.precio}</strong>
            </span>
            <span className="inline-flex items-center gap-2">
              👤 Dueño: <strong>{acercaDe.dueno}</strong>
            </span>
          </div>

          <div className="text-sm text-gray-800 whitespace-pre-line">
            {acercaDe.descripcion}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= ADMIN (AGREGADO) ================= */

function AdminPanel({ adminSeccion, setAdminSeccion }) {
  const [reglas] = useState([
    "Sé positivo",
    "No a la autopromoción",
    "Haz un esfuerzo al participar",
  ]);

  const [categorias] = useState([
    { nombre: "Servicio de Rentas Internas", permiso: "Admins" },
    { nombre: "IESS", permiso: "Miembros" },
    { nombre: "Ministerio de Trabajo", permiso: "Admins" },
    { nombre: "Tips Tributarios", permiso: "Admins" },
    { nombre: "Decretos Ejecutivos", permiso: "Admins" },
    { nombre: "Corte Constitucional", permiso: "Admins" },
  ]);

  const [tabsVisibles, setTabsVisibles] = useState({
    aula: true,
    calendario: true,
    mapa: false,
  });

  const toggleTab = (key) => {
    setTabsVisibles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [plugins, setPlugins] = useState({
    preguntasIngreso: false,
    desbloquearChat: false,
    desbloquearPost: false,
    autoDM: true,
    onboardingVideo: false,
    zapier: false,
    metaPixel: false,
  });

  const togglePlugin = (key) => {
    setPlugins((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const opciones = [
    "Panel de control",
    "Invitación",
    "General",
    "Pagos",
    "Precios",
    "Afiliados",
    "Complementos",
    "Pestañas",
    "Categorías",
    "Reglas",
    "Descubrimiento",
    "Métricas",
    "Facturación",
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-3">
        <div className="border rounded-xl p-4 bg-white">
          <h2 className="text-base font-semibold mb-3">Administración</h2>

          <div className="space-y-2">
            {opciones.map((op) => (
              <button
                key={op}
                onClick={() => setAdminSeccion(op)}
                className={`w-full text-left px-3 py-2 rounded-md border ${
                  adminSeccion === op
                    ? "bg-yellow-200 border-yellow-300"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="col-span-9">
        {/* ================= FACTURACIÓN ================= */}
        {adminSeccion === "Facturación" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold">Facturación</h2>
              <p className="text-sm text-gray-600">
                Administra tu método de pago y suscripción.
              </p>
            </div>

            {/* MÉTODO DE PAGO */}
            <div className="border rounded-lg p-4 space-y-2">
              <p className="text-sm text-gray-600">
                Método de pago — <strong>VISA terminada en 9831</strong>
              </p>
              <p className="text-sm text-gray-600">
                Próxima fecha de cobro: <strong>5 de febrero de 2026</strong>
              </p>

              <div className="flex gap-6 mt-3 text-sm">
                <button className="text-blue-600 hover:underline">
                  Actualizar método de pago
                </button>

                <button className="text-blue-600 hover:underline">
                  Administrar suscripción
                </button>
              </div>
            </div>

            {/* ELIMINAR GRUPO */}
            <div className="pt-4 border-t">
              <button className="text-red-600 hover:underline text-sm font-medium">
                Eliminar grupo
              </button>
            </div>
          </div>
        )}

        {/* ================= MÉTRICAS - DISEÑO 2 ================= */}
        {adminSeccion === "Métricas" && (
          <div className="space-y-8">
            {/* RESUMEN GENERAL */}
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">
                Resumen últimos 30 días
              </h2>
              <p className="text-sm text-gray-600">
                Tu grupo creció a <strong>584 miembros (+79)</strong> y
                <strong> 411 miembros (70%)</strong> estuvieron activos.
              </p>
            </div>

            {/* KPIs */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white border rounded-xl p-5 text-center">
                <p className="text-sm text-gray-500">Miembros Totales</p>
                <h3 className="text-3xl font-bold text-blue-600">584</h3>
                <span className="text-xs text-green-600">+79 este mes</span>
              </div>

              <div className="bg-white border rounded-xl p-5 text-center">
                <p className="text-sm text-gray-500">Miembros Activos</p>
                <h3 className="text-3xl font-bold text-green-600">411</h3>
                <span className="text-xs text-gray-500">70% participación</span>
              </div>

              <div className="bg-white border rounded-xl p-5 text-center">
                <p className="text-sm text-gray-500">Publicaciones</p>
                <h3 className="text-3xl font-bold text-purple-600">128</h3>
                <span className="text-xs text-gray-500">Últimos 30 días</span>
              </div>

              <div className="bg-white border rounded-xl p-5 text-center">
                <p className="text-sm text-gray-500">Retención</p>
                <h3 className="text-3xl font-bold text-orange-600">93%</h3>
                <span className="text-xs text-gray-500">Excelente</span>
              </div>
            </div>

            {/* BARRAS DE CRECIMIENTO */}
            <div className="bg-white border rounded-xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Crecimiento de Miembros</h3>
                <div className="space-y-2">
                  {[450, 470, 490, 520, 540, 560, 584].map((valor, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm">
                        <span>Semana {i + 1}</span>
                        <span>{valor}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${valor / 6}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Actividad de Usuarios</h3>
                <div className="space-y-2">
                  {[250, 280, 300, 330, 360, 390, 411].map((valor, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm">
                        <span>Semana {i + 1}</span>
                        <span>{valor}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${valor / 5}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= DESCUBRIMIENTO ================= */}
        {adminSeccion === "Descubrimiento" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold">Descubrimiento</h2>
              <p className="text-sm text-gray-600">
                Sé descubierto por millones de usuarios activos.
              </p>
            </div>

            {/* ESTADO */}
            <div className="text-sm text-gray-700 flex flex-wrap gap-4">
              <span>
                Mostrándose en descubrimiento:{" "}
                <strong className="text-green-600">Sí</strong>
              </span>

              <span>
                Categoría: <strong>💰 Dinero</strong>
              </span>

              <span>
                Ranking: <strong className="text-green-600">#8842</strong>
              </span>

              <span>
                Idioma: <strong>ES</strong>
              </span>
            </div>

            {/* EXPLICACIONES */}
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                <strong>Mostrarse en descubrimiento —</strong> Los grupos
                necesitan un mínimo de miembros, publicaciones y actividad para
                aparecer en descubrimiento. También se requiere una descripción
                del grupo, imágenes y una portada.
              </p>

              <p>
                <strong>Ranking de descubrimiento —</strong> Los grupos se
                clasifican según crecimiento de miembros, interacción y
                retención. Si haces crecer tu comunidad y mantienes la
                participación, tu ranking aumentará.
              </p>

              <p>
                <strong>Impulsos y penalizaciones —</strong> Para evitar abusos,
                existe revisión manual para aplicar mejoras o penalizaciones.
              </p>
            </div>

            {/* BOOSTS */}
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-green-600 mb-2">Impulsos</h3>
                <ul className="space-y-1">
                  <li>+ Página con arte y descripción de calidad</li>
                  <li>+ Nicho interesante</li>
                  <li>+ Interacción humana auténtica</li>
                  <li>+ Dueño activo</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-red-600 mb-2">
                  Penalizaciones
                </h3>
                <ul className="space-y-1">
                  <li>- Bots o cuentas falsas</li>
                  <li>- Spam o baja interacción</li>
                  <li>- Arte o descripción de baja calidad</li>
                  <li>- Pagos fuera de la plataforma</li>
                  <li>- Mal soporte al cliente</li>
                  <li>- Dueño inactivo</li>
                </ul>
              </div>
            </div>

            {/* NOTA */}
            <p className="text-sm text-gray-600">
              <strong>Nota —</strong> Eliminar miembros inactivos no mejora el
              ranking. Algunas personas solo observan sin participar.
            </p>

            <p className="text-sm text-gray-600">
              Si la categoría o idioma son incorrectos, contacta soporte.
            </p>
          </div>
        )}

        {/* ================= REGLAS ================= */}
        {adminSeccion === "Reglas" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Reglas</h2>
                <p className="text-sm text-gray-600">
                  Define normas para la participación en la comunidad.
                </p>
              </div>

              <button className="bg-yellow-400 px-4 py-2 rounded-md text-sm font-semibold">
                NUEVO
              </button>
            </div>

            <div className="space-y-3">
              {reglas.map((regla, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border rounded-lg px-4 py-3 flex justify-between items-center"
                >
                  <p className="font-medium">
                    {i + 1}. {regla}
                  </p>

                  <button className="text-gray-400 hover:text-gray-700">
                    •••
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= CATEGORÍAS ================= */}
        {adminSeccion === "Categorías" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Categorías</h2>

              <button className="bg-yellow-400 px-4 py-2 rounded-md text-sm font-semibold">
                NEW
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Organiza publicaciones con categorías, permisos y orden.
            </p>

            <div className="space-y-3">
              {categorias.map((cat, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border rounded-lg px-4 py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{cat.nombre}</p>
                    <p className="text-sm text-gray-500">
                      Permisos: {cat.permiso} · Orden: Default
                    </p>
                  </div>

                  <button className="text-gray-400 hover:text-gray-700">
                    •••
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PESTAÑAS ================= */}
        {adminSeccion === "Pestañas" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold">Pestañas</h2>
            <p className="text-sm text-gray-600">
              Mostrar u ocultar pestañas en tu comunidad.
            </p>

            {[
              {
                key: "aula",
                titulo: "Classroom",
                desc: "Organiza cursos, recursos y guías.",
              },
              {
                key: "calendario",
                titulo: "Calendar",
                desc: "Eventos, mentorías y reuniones en vivo.",
              },
              {
                key: "mapa",
                titulo: "Map",
                desc: "Mostrar ubicaciones de miembros.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex justify-between items-center border rounded-lg p-4"
              >
                <div>
                  <p className="font-semibold">{item.titulo}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>

                <button
                  onClick={() => toggleTab(item.key)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold ${
                    tabsVisibles[item.key]
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tabsVisibles[item.key] ? "ON" : "OFF"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ================= COMPLEMENTOS ================= */}
        {adminSeccion === "Complementos" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold">Plugins</h2>

            {[
              {
                key: "preguntasIngreso",
                titulo: "Preguntas de ingreso",
                desc: "Hacer preguntas antes de aprobar acceso.",
              },
              {
                key: "desbloquearChat",
                titulo: "Desbloquear chat por nivel",
                desc: "Requiere cierto nivel para usar el chat.",
              },
              {
                key: "desbloquearPost",
                titulo: "Publicar solo en nivel 2 o 3",
                desc: "Reduce spam en la comunidad.",
              },
              {
                key: "autoDM",
                titulo: "Mensaje automático a nuevos miembros",
                desc: "Envía DM automático al ingresar.",
              },
              {
                key: "onboardingVideo",
                titulo: "Video de bienvenida",
                desc: "Mostrar video al unirse.",
              },
              {
                key: "zapier",
                titulo: "Integración Zapier",
                desc: "Conectar CRM y automatizaciones.",
              },
              {
                key: "metaPixel",
                titulo: "Meta Pixel Tracking",
                desc: "Seguimiento de conversiones.",
              },
            ].map((plugin) => (
              <div
                key={plugin.key}
                className="flex justify-between items-center border rounded-lg p-4"
              >
                <div>
                  <p className="font-semibold">{plugin.titulo}</p>
                  <p className="text-sm text-gray-500">{plugin.desc}</p>
                </div>

                <button
                  onClick={() => togglePlugin(plugin.key)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold ${
                    plugins[plugin.key]
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {plugins[plugin.key] ? "ON" : "OFF"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ================= AFILIADOS ================= */}
        {adminSeccion === "Afiliados" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold">Afiliados</h2>

            <p className="text-sm text-gray-600">
              Recompensa a tus miembros por referir amigos ofreciendo comisiones
              recurrentes.
            </p>

            <div className="space-y-3 text-sm">
              {["OFF", "10%", "20%", "30%", "40% (más efectivo)", "50%"].map(
                (op, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="afiliados"
                      defaultChecked={op === "30%"}
                    />
                    {op}
                  </label>
                ),
              )}
            </div>
          </div>
        )}

        {/* ================= PANEL DE CONTROL ================= */}
        {adminSeccion === "Panel de control" && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white border rounded-xl p-4 text-center">
                <h3 className="text-2xl font-bold">587</h3>
                <p className="text-sm text-gray-500">Miembros</p>
              </div>

              <div className="bg-white border rounded-xl p-4 text-center">
                <h3 className="text-2xl font-bold">$10,664</h3>
                <p className="text-sm text-gray-500">MRR</p>
              </div>

              <div className="bg-white border rounded-xl p-4 text-center">
                <h3 className="text-2xl font-bold">8.4%</h3>
                <p className="text-sm text-gray-500">Conversión</p>
              </div>

              <div className="bg-white border rounded-xl p-4 text-center">
                <h3 className="text-2xl font-bold">93.7%</h3>
                <p className="text-sm text-gray-500">Retención</p>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-5">
              <h3 className="font-semibold mb-3">Crecimiento de Miembros</h3>

              <div className="h-64 flex items-end gap-2">
                {[
                  420, 500, 470, 430, 390, 400, 430, 440, 450, 470, 500, 520,
                  590,
                ].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className="bg-blue-400 rounded-t-md"
                      style={{ height: `${v / 2}px` }}
                    />
                    <p className="text-xs text-center mt-1 text-gray-500">
                      {
                        [
                          "JAN",
                          "FEB",
                          "MAR",
                          "APR",
                          "MAY",
                          "JUN",
                          "JUL",
                          "AUG",
                          "SEP",
                          "OCT",
                          "NOV",
                          "DEC",
                          "JAN",
                        ][i]
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= INVITACIÓN ================= */}
        {/* ================= GENERAL ================= */}
        {/* ================= PRECIOS ================= */}
        {adminSeccion === "Precios" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Modelo de precios</h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-semibold">
                Guardado
              </span>
            </div>

            {/* OPCIONES */}
            <div className="grid grid-cols-5 gap-3 text-sm">
              {[
                ["Gratis", "Gratis para unirse"],
                ["Suscripción", "Cobro mensual o anual"],
                ["Freemium", "Gratis con mejoras pagadas"],
                ["Niveles", "2-3 niveles pagos"],
                ["Pago único", "Pago único"],
              ].map((op, i) => (
                <div
                  key={i}
                  className={`border rounded-lg p-3 cursor-pointer ${
                    op[0] === "Subscription"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-semibold">{op[0]}</p>
                  <p className="text-gray-500 text-xs">{op[1]}</p>
                </div>
              ))}
            </div>

            {/* PRECIO */}
            <div className="border rounded-lg p-4 flex items-center gap-3">
              <span className="text-gray-500">Precio:</span>
              <strong className="text-lg">$197/año</strong>
            </div>

            {/* TRIAL */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">
                Prueba gratis 7 días
              </label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* ================= PAGOS ================= */}
        {adminSeccion === "Pagos" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Pagos</h2>
              <button className="border px-3 py-2 rounded-md text-sm">
                ⚙ Configuración
              </button>
            </div>

            {/* BALANCE */}
            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-xl p-5">
                <p className="text-sm text-gray-500">Balance de cuenta</p>
                <h3 className="text-3xl font-bold text-green-600">$8,924.31</h3>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Próximo pago será de <strong>$4,287.65</strong> en 1 día
                </p>
                <p className="text-sm text-gray-500">
                  $4,636.66 está pendiente
                </p>
              </div>
            </div>

            {/* HISTORIAL */}
            <div className="border rounded-lg">
              {[
                [
                  "January 21, 2026",
                  "BANCO PICHINCHA C.A. ** 8300",
                  "$6,106.00",
                ],
                [
                  "January 14, 2026",
                  "BANCO PICHINCHA C.A. ** 8300",
                  "$2,325.66",
                ],
                [
                  "January 7, 2026",
                  "BANCO PICHINCHA C.A. ** 8300",
                  "$1,575.54",
                ],
                [
                  "December 31, 2025",
                  "BANCO PICHINCHA C.A. ** 8300",
                  "$1,682.14",
                ],
                [
                  "December 24, 2025",
                  "BANCO PICHINCHA C.A. ** 6715",
                  "$1,219.63",
                ],
              ].map((pago, i) => (
                <div
                  key={i}
                  className="flex justify-between px-4 py-3 border-b last:border-none text-sm"
                >
                  <span>{pago[0]}</span>
                  <span className="text-gray-600">{pago[1]}</span>
                  <span className="font-semibold">{pago[2]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminSeccion === "General" && (
          <div className="bg-white border rounded-xl p-6 space-y-6">
            {/* ICONO Y COVER */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-2">Icono</p>
                <div className="border rounded-lg p-4 text-center">
                  <div className="h-24 w-24 bg-gray-200 mx-auto mb-3 rounded-lg"></div>
                  <button className="border px-4 py-2 rounded-md text-sm">
                    Cambiar
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Portada</p>
                <div className="border rounded-lg p-4 text-center">
                  <div className="h-24 bg-gray-200 mb-3 rounded-lg"></div>
                  <button className="border px-4 py-2 rounded-md text-sm">
                    Cambiar
                  </button>
                </div>
              </div>
            </div>

            {/* NOMBRE DEL GRUPO */}
            <div>
              <label className="text-sm font-semibold">Nombre del grupo</label>
              <input
                className="w-full border rounded-lg px-3 py-2 mt-1"
                defaultValue="ConexionContable"
              />
            </div>

            {/* DESCRIPCIÓN */}
            <div>
              <label className="text-sm font-semibold">
                Descripción del grupo
              </label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 mt-1"
                rows="3"
                defaultValue="Tu comunidad para aprender, mejorar, compartir conocimiento y experiencia en la contabilidad - impuestos - finanzas."
              />
            </div>

            {/* URL PERSONALIZADA */}
            <div className="bg-yellow-50 border rounded-lg p-4">
              <p className="text-sm font-semibold">
                Destaca con una URL personalizada
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-blue-600 text-sm">
                  skool.com/esteban-jjgacademy-9792
                </span>
                <button className="bg-yellow-400 px-4 py-2 rounded-md text-sm font-semibold">
                  Cambiar URL
                </button>
              </div>
            </div>

            {/* PRIVACIDAD */}
            <div>
              <p className="text-sm font-semibold mb-2">Privacidad</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="privacidad" defaultChecked />
                  Privado
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="privacidad" />
                  Público
                </label>
              </div>
            </div>
          </div>
        )}

        {adminSeccion === "Invitación" && (
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold">Invitar Miembros</h2>

            <p className="text-sm text-gray-600">
              Comparte este enlace para que nuevas personas se unan a tu
              comunidad.
            </p>

            <div className="flex gap-2">
              <input
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
                value="https://jjgacademy.com/invitacion/conexion-contable"
                readOnly
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Copiar
              </button>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-2">Invitar por correo</h3>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Escribe correos separados por coma"
              />
              <button className="mt-3 bg-primary text-white px-4 py-2 rounded-lg">
                Enviar invitación
              </button>
            </div>
          </div>
        )}

        {/* ================= RESTO SECCIONES ================= */}
        {adminSeccion !== "Panel de control" &&
          adminSeccion !== "Invitación" &&
          adminSeccion !== "General" &&
          adminSeccion !== "Precios" &&
          adminSeccion !== "Facturación" &&
          adminSeccion !== "Métricas" &&
          adminSeccion !== "Descubrimiento" &&
          adminSeccion !== "Reglas" &&
          adminSeccion !== "Categorías" &&
          adminSeccion !== "Pestañas" &&
          adminSeccion !== "Complementos" &&
          adminSeccion !== "Afiliados" &&
          adminSeccion !== "Pagos" && (
            <div className="border rounded-xl p-5 bg-white">
              <h2 className="text-xl font-bold mb-2">{adminSeccion}</h2>
              <p className="text-sm text-gray-600">
                Aquí irá el contenido de <strong>{adminSeccion}</strong>
              </p>
            </div>
          )}
      </section>
    </div>
  );
}

/* ================= MAPA ================= */

const icono = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapaUsuarios({ miembros }) {
  return (
    <MapContainer
      center={[-10, -70]}
      zoom={3}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {miembros.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={icono}>
          <Popup>
            <strong>{m.nombre}</strong>
            <br />
            {m.rol}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
