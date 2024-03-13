import { create } from "apisauce";

import axios from "axios";

// export const IP_ADDRESS = "https://nekhor.camisetaredutoralpostural.com.br";
// export const WS_ADDRESS = "ws://nekhor.camisetaredutoralpostural.com.br/cable";
// export const IMAGE_ADDRESS = "https://nekhor.camisetaredutoralpostural.com.br";
export const IP_ADDRESS = "http://192.168.100.40:3000";
export const WS_ADDRESS = "ws://192.168.100.40:3000/cable";
export const IMAGE_ADDRESS = "http://192.168.100.40:3000";

export const api = axios.create({
  baseURL: IP_ADDRESS,
  headers: { Accept: "application/json" },
});

export const getLanguages = () => {
  return api.get("/api/languages");
};

export const getMenus = (params = "") => {
  return api.get(`/api/locals${params}`);
};

export const getHome = (params = "") => {
  return api.get(`/api/locals/home${params}`);
};

export const getSubCategories = (params = "") => {
  return api.get(`/api/countries?${params}`);
};

export const getPostsItineraries = (params = "") => {
  return api.get(`/api/posts/get_itineraries${params}`);
};

export const getPosts = (params = "") => {
  return api.get(`/api/posts?${params}`);
};

export const getPost = (id, params = "") => {
  return api.get(`/api/posts/${id}${params}`);
};
