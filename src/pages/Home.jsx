import "../css/home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero">

      <div className="hero-content">

        <div className="hero-left">
          <h4 className="mini-title">ASESORÍA CONTABLE EN ECUADOR</h4>

          <h1 className="hero-title">
            CURSOS DE CONTABILIDAD Y TRIBUTACIÓN,<br />
            ACTUALIZACIONES TRIBUTARIAS Y MÁS.
          </h1>

          <p className="hero-description">
            Ofrecemos asesoría contable, cursos de capacitación y
            profesionalización tributaria en Ecuador.
          </p>
        </div>

        <div className="hero-right">
          <img src="/logo.png" alt="JJGACADEMY Logo" />
        </div>

      </div>

    </div>
  );
}
