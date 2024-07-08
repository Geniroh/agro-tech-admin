import axios from "axios";
import { ROUTES } from "./resources";

const BASEURL = "http://localhost:8080";

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
