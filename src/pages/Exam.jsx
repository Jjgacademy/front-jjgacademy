import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { useParams } from "react-router-dom";

export default function Exam() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 🔥 cargar examen RANDOM (10 preguntas)
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const data = await apiRequest(`/exam/random/${id}`);
        setQuestions(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchExam();
  }, [id]);

  const handleAnswer = (qId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const submitExam = async () => {
    try {
      const res = await apiRequest(`/exam/submit/${id}`, "POST", {
        answers,
      });
      setResult(res);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (error)
    return (
      <div className="p-10 text-red-600 font-semibold">
        {error}
      </div>
    );

  if (!questions.length)
    return <p className="p-10">Cargando examen...</p>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">
        Examen
      </h1>

      {questions.map((q, i) => (
        <div key={q.id} className="border p-4 rounded">
          <p className="font-semibold">
            {i + 1}. {q.question}
          </p>

          {["a", "b", "c", "d"].map((opt) =>
            q[`option_${opt}`] ? (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={q.id}
                  onChange={() => handleAnswer(q.id, opt)}
                />{" "}
                {q[`option_${opt}`]}
              </label>
            ) : null
          )}
        </div>
      ))}

      <button
        onClick={submitExam}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Enviar examen
      </button>

      {result && (
        <div className="p-4 bg-green-100 rounded">
          Puntaje: {result.score}
          <br />
          {result.aprobado
            ? "Aprobado ✅"
            : "Reprobado ❌"}
        </div>
      )}
    </div>
  );
}
