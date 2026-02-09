import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCommunities } from "../services/communityService";

export default function Aula() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCommunities();
        setCommunities(data);
      } catch (err) {
        console.error("Error cargando comunidades", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="p-10">Cargando comunidades...</div>;
  }

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-2xl font-bold">Mi Aula</h1>

      {communities.map((c) => (
        <div key={c.id} className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-xl font-semibold mb-4">{c.nombre}</h2>

          {c.courses.length === 0 ? (
            <p className="text-gray-400">No hay cursos aún</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/curso/${course.id}`)}
                >
                  <h3 className="font-medium">{course.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
