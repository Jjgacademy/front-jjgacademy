import { apiRequest } from "./api";

export const getVideosByCourse = (courseId) => {
  return apiRequest(`/courses/${courseId}/videos`);
};
