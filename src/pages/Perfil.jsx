import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Perfil() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Perfil</h2>
      <p>Bienvenido: {user?.email}</p>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
