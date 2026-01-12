import { apiRequest } from "./api";

// 📁 Obtener materiales por curso
export async function getMaterialsByCourse(courseId) {
  return await apiRequest(`/courses/${courseId}/materials`);
}
