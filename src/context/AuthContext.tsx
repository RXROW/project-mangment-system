import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextProviderProps = {
    children: React.ReactNode
}
// Define the structure of the decoded JWT
interface DecodedToken {
    userName: string,
    userEmail: string,
    userGroup: string
    // Add other properties that you expect from the JWT
}
// Type for the context
interface AuthContextType {
    loginData: DecodedToken | null,
    saveLoginData: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({children}: AuthContextProviderProps) {
    const [loginData, setLoginData] = useState<DecodedToken | null>(null)
    const saveLoginData = () => {
        const token = localStorage.getItem('token');
    if (!token) return; 

    try {
        const decoded: DecodedToken = jwtDecode(token);
        setLoginData(decoded);
    } catch (error) {
        console.error("Error decoding token:", error);
        setLoginData(null); 
    }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            saveLoginData()   
        }
    }, [])

    return (
        <AuthContext.Provider value={{loginData, saveLoginData}}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use the auth context
export function useAuthContext() {
    const authContext = useContext(AuthContext);
    if (authContext === null) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return authContext;
}