import "../css/cursos.css";

export default function Cursos() {

  const cursos = [
    "ACTUALIZACIÓN LABORAL 24/10/2025",
    "AGENCIA DE VIAJES",
    "ANTICIPO DE UTILIDADES",
    "PROPIEDAD PLANTA Y EQUIPO",
    "NIC 2 ¨INVENTARIOS¨",
    "ACTUALIZACIÓN LABORAL 20/09/2025",
    "CONSUMOS ESPECIALES ICE",
    "CONTABILIDAD PARA INSTITUCIONES SIN FINES DE LUCRO",
    "TRIBUTACIÓN PARA INSTITUCIONES SIN FINES DE LUCRO",
    "NIFF 16 -ARRIENDOS",
    "CONTABILIDAD Y TRIBUTACIÓN SECTOR CONSTRUCCIÓN",
    "IMPUESTO A LA RENTA PN NO OBLIGADAS A LLEVAR CONTABILIDAD",
    "CIERRE FISCAL",
  ];

  return (
    <div className="courses-container">
      <h1 className="title">Nuestros Cursos</h1>

      <div className="courses-grid">
        
        {cursos.map((curso, index) => (
          <div className="course-card" key={index}>
            
            <div className="course-image">
              <img src="/logo.png" alt="curso" />
            </div>

            <div className="course-info">
              <h3>{curso}</h3>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
