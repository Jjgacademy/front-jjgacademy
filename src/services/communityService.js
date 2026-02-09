import { apiRequest } from "./api";

export const getCommunities = () =>
  apiRequest("/communities");

export const getCommunity = (slug) =>
  apiRequest(`/communities/${slug}`);
