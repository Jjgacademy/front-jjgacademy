import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState("perfil");

  const comunidades = [
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 text-sm">
          <button onClick={() => navigate("/")} className="hover:underline">
            ← Volver al inicio
          </button>
          <span className="opacity-60">|</span>
          <span className="font-medium">Mi perfil</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* SIDEBAR */}
        <aside className="col-span-3 bg-white rounded-xl border p-4 space-y-2">
          <MenuItem label="Perfil" active={seccion === "perfil"} onClick={() => setSeccion("perfil")} />
          <MenuItem label="Comunidades" active={seccion === "comunidades"} onClick={() => setSeccion("comunidades")} />
          <MenuItem label="Afiliados" active={seccion === "afiliados"} onClick={() => setSeccion("afiliados")} />
          <MenuItem label="Pagos" active={seccion === "pagos"} onClick={() => setSeccion("pagos")} />
          <MenuItem label="Métodos de pago" active={seccion === "metodos"} onClick={() => setSeccion("metodos")} />
          <MenuItem label="Historial financiero" active={seccion === "historial"} onClick={() => setSeccion("historial")} />
          <MenuItem label="Notificaciones" active={seccion === "notificaciones"} onClick={() => setSeccion("notificaciones")} />
          <MenuItem label="Cuenta" active={seccion === "cuenta"} onClick={() => setSeccion("cuenta")} />
          <MenuItem label="Mensajes" active={seccion === "mensajes"} onClick={() => setSeccion("mensajes")} />
        </aside>

        {/* CONTENIDO */}
        <section className="col-span-9 space-y-6">

          {/* PERFIL */}
          {seccion === "perfil" && (
            <div className="bg-white rounded-xl border p-6 space-y-8">
              <h2 className="text-lg font-semibold">Información personal</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input className="input" placeholder="Nombres" />
                <input className="input" placeholder="Apellidos" />
                <input className="input bg-gray-100" value="admin@jjgacademy.com" disabled />
                <input className="input" placeholder="Teléfono" />
              </div>

              <textarea className="input min-h-[100px]" placeholder="Biografía" />

              <div>
                <h3 className="font-medium mb-2">Redes sociales</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input className="input" placeholder="Facebook (URL)" />
                  <input className="input" placeholder="Instagram (URL)" />
                  <input className="input" placeholder="LinkedIn (URL)" />
                  <input className="input" placeholder="TikTok (URL)" />
                </div>
              </div>

              <button className="btn-primary">Guardar cambios</button>
            </div>
          )}

          {/* COMUNIDADES */}
          {seccion === "comunidades" && (
            <div className="bg-white rounded-xl border p-6 space-y-4">
              <h2 className="text-lg font-semibold">Mis comunidades</h2>

              {comunidades.map((c) => (
                <div key={c.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <img src={c.logo} className="w-12 h-12 rounded-md border" />
                    <div>
                      <p className="font-medium">{c.nombre}</p>
                      <p className="text-sm text-gray-500">{c.miembros} miembros · {c.tipo}</p>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Rol: {c.rol}</span>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/c/${c.slug}`)} className="btn-primary">Entrar</button>
                </div>
              ))}
            </div>
          )}

          {/* AFILIADOS */}
          {seccion === "afiliados" && (
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <h2 className="text-lg font-semibold">Afiliados</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <Stat label="Últimos 30 días" value="$0" />
                <Stat label="Total ganado" value="$0" />
                <Stat label="Saldo disponible" value="$0" highlight />
                <button className="btn-disabled">Pago</button>
              </div>
            </div>
          )}

          {/* PAGOS */}
          {seccion === "pagos" && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold">Pagos</h2>
              <p className="text-sm text-gray-500 mt-2">Aún no hay pagos registrados.</p>
            </div>
          )}

          {/* MÉTODOS */}
          {seccion === "metodos" && (
            <div className="bg-white rounded-xl border p-6 flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">Métodos de pago</h2>
                <p className="text-sm text-gray-500">No hay tarjetas registradas</p>
              </div>
              <button className="btn-primary">Agregar método</button>
            </div>
          )}

          {/* HISTORIAL */}
          {seccion === "historial" && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-semibold">Historial financiero</h2>
              <p className="text-sm text-gray-500 mt-2">No tienes movimientos registrados.</p>
            </div>
          )}

          {/* NOTIFICACIONES */}
          {seccion === "notificaciones" && (
            <div className="bg-white rounded-xl border p-6 space-y-4">
              <h2 className="text-lg font-semibold">Notificaciones</h2>
              <Toggle label="Nuevo seguidor" />
              <Toggle label="Me gusta en publicaciones" />
              <Toggle label="Pago recibido" />
              <Toggle label="Referencia de afiliado" />
            </div>
          )}

          {/* CUENTA */}
          {seccion === "cuenta" && (
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <h2 className="text-lg font-semibold">Cuenta</h2>
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Correo electrónico</p>
                  <p className="text-sm text-gray-500">johanpavon10@gmail.com</p>
                </div>
                <button className="btn-secondary">Cambiar correo</button>
              </div>
            </div>
          )}

          {/* MENSAJES */}
          {seccion === "mensajes" && (
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <h2 className="text-lg font-semibold">Mensajes</h2>

              <div className="flex justify-between">
                <p className="text-sm text-gray-600">
                  Notificarme con sonido y pestaña activa cuando reciba mensajes
                </p>
                <Toggle />
              </div>

              <div className="flex justify-between border-t pt-4">
                <p className="text-sm text-gray-600">
                  Notificaciones por correo electrónico
                </p>
                <Toggle />
              </div>

              <div className="border-t pt-4">
                <p className="font-medium">Usuarios bloqueados</p>
                <p className="text-sm text-gray-500">No tienes usuarios bloqueados</p>
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}

/* COMPONENTES */

function MenuItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-md text-left text-sm ${
        active ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div className={`border rounded-lg p-4 text-center ${highlight ? "text-green-600 font-semibold" : ""}`}>
      <p className="text-lg">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function Toggle() {
  const [on, setOn] = useState(true);

  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-10 h-6 rounded-full flex items-center ${
        on ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span className={`w-5 h-5 bg-white rounded-full transform ${on ? "translate-x-4" : "translate-x-1"}`} />
    </button>
  );
}
