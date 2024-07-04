import { api, setAuthorizationToken } from "../api/api";
import { ROUTES } from "../api/resources";
import { AUTH_TOKEN_KEY } from "../constants";

export class AuthService {
  static async authenticate(email: string, password: string) {
    const { data } = await api.post(ROUTES.loginUrl, { email, password });
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    setAuthorizationToken(data.token);
    return data.token;
  }

  static async getAuthenticatedUser() {
    const { data } = await api.get(ROUTES.authUser);
    return data?.data;
  }
}
