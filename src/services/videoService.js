import { apiRequest } from "./api";

/* =========================
   OBTENER VIDEOS POR CURSO
========================= */
export const getVideosByCourse = (courseId) => {
  return apiRequest(`/courses/${courseId}/videos`);
};

/* =========================
   CREAR VIDEO
========================= */
export const createVideo = (data) => {
  return apiRequest("/videos", "POST", data);
};

/* =========================
   EDITAR VIDEO
========================= */
export const updateVideo = (id, data) => {
  return apiRequest(`/videos/${id}`, "PUT", data);
};

/* =========================
   ELIMINAR VIDEO
========================= */
export const deleteVideo = (id) => {
  return apiRequest(`/videos/${id}`, "DELETE");
};
