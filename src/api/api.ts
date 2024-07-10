import axios from "axios";
import { ROUTES } from "./resources";

// https://agro-tech-admin-api.onrender.com
const BASEURL = "https://agro-tech-admin-api.onrender.com";

export const api = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthorizationToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const revokeAUthorization = async () => {
  const { data } = await api.get(ROUTES.logoutUrl);

  return data;
};
