import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { revokeAUthorization, setAuthorizationToken } from "../api/api";
import { Result, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../constants";
import { IUser } from "../types";
import { AuthService } from "../service/auth.service";

interface AuthContextType {
  logout: () => void;
  user: IUser;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line
// eslint-disable-next-line
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth can only be used with an AuthContextProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>({
    _id: "",
    email: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAuthUSer = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        setAuthorizationToken(token);
      }
      try {
        const authUser = await AuthService.getAuthenticatedUser();
        setUser(authUser);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    getAuthUSer();
  }, []);

  const logout = useCallback(() => {
    setLoading(true);
    setAuthorizationToken("");
    setAuthenticated(false);
    revokeAUthorization();
    localStorage.removeItem(AUTH_TOKEN_KEY);

    navigate("/", { replace: true });
    // eslint-disable-next-line
  }, [setLoading, setAuthenticated]);

  const value = useMemo(() => ({ user, logout }), [user, logout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-black/90">
        <Spin size="large" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Result
        status="403"
        title="Unauthorised Access"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link
            replace
            to="/"
            className="text-white bg-primary px-5 py-3 hover:text-white hover:bg-primary/90"
          >
            Login
          </Link>
        }
      />
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
