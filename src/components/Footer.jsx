import "../css/layout.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} JJG ACADEMY. Todos los derechos reservados.</p>
        <div className="footer-links">
          <span>Contacto: info@jjgacademy.com</span>
        </div>
      </div>
    </footer>
  );
}