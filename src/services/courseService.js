import { apiRequest } from "./api";

export const getCoursesByCommunity = (communityId) => {
  return apiRequest(`/courses/community/${communityId}`);
};
