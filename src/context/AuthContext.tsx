import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

interface DecodedToken {
  userName: string;
  userEmail: string;
  userGroup: string;
}

interface AuthContextType {
  loginData: DecodedToken | null;
  saveLoginData: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);
  const lastTokenRef = useRef<string | null>(localStorage.getItem("token"));

  const saveLoginData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginData(null);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setLoginData(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
      setLoginData(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
  };

  useEffect(() => {
    saveLoginData(); 
    const checkTokenChange = () => {
      const currentToken = localStorage.getItem("token");
      if (currentToken !== lastTokenRef.current) {
        lastTokenRef.current = currentToken;
        saveLoginData();
      }
    };

    const interval = setInterval(checkTokenChange, 100); 

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (authContext === null) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return authContext;
}
