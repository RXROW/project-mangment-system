export interface LoginData {
    userName: string
    userEmail: string;
    userGroup: string
}


export interface AuthContextType {
    loginData: LoginData | null;
    saveLoginData: () => void;
    setLoginData: React.Dispatch<React.SetStateAction<LoginData | null>>
}