import { create } from "apisauce";

import axios from "axios";

export const IP_ADDRESS = "http://192.168.100.40:3000";
export const WS_ADDRESS = "ws://192.168.100.40:3000/cable";
export const IMAGE_ADDRESS = "http://192.168.100.40:3000";

export const api = axios.create({
  baseURL: IP_ADDRESS,
  headers: { Accept: "application/json" },
});

export const getMenus = () => {
  return api.get("/api/locals");
};

export const getHome = () => {
  return api.get("/api/locals/home");
};

export const getSubCategories = (params) => {
  return api.get(`/api/countries?${params}`);
};

export const getPostsItineraries = () => {
  return api.get(`/api/posts/get_itineraries`);
};

export const getPosts = (params) => {
  return api.get(`/api/posts?${params}`);
};

export const getPost = (id) => {
  return api.get(`/api/posts/${id}`);
};
