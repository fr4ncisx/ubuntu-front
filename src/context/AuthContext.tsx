import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { DecodedToken } from "../models/InterfaceModels";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  VISITOR = "VISITOR",
}

interface AuthContextType {
  authToken: string | null;
  user: DecodedToken | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateProfileImage: (newImage: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);

    const decoded = decodeToken<DecodedToken>(token.replace("Bearer ", ""));
    if (decoded) {
      const { ...userWithoutIssAndJti } = decoded;
      localStorage.setItem("user", JSON.stringify(userWithoutIssAndJti));
      setUser(userWithoutIssAndJti);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    navigate("/login");
  };

  const updateProfileImage = (newImage: string) => {
    if (user) {
      const updatedUser = { ...user, imagen: newImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const contextValue = useMemo(() => (
    {
      authToken,
      user,
      loading,
      login,
      logout,
      updateProfileImage
    }), [authToken, user, loading, login, logout, updateProfileImage]);

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
