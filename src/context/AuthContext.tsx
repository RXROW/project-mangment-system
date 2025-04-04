// import { jwtDecode } from "";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { privateInstance } from "../services/apiConfig";
import { PROJECTS_URLS, TASKS_URLS, USERS_URLS } from "../services/apiUrls";
type AuthContextProviderProps = {
  children: React.ReactNode;
};
// Define the structure of the decoded JWT
interface DecodedToken {
  userName: string;
  userEmail: string;
  userGroup: string;
  // Add other properties that you expect from the JWT
}
// Type for the context
interface AuthContextType {
  loginData: DecodedToken | null;
  saveLoginData: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [project, setProject] = useState([]);
  const [SearchQueryTasks, setSearchQueryTasks] = useState("");
  const [StatsTasks, setStatsTasks] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const saveLoginData = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setLoginData(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
      setLoginData(null);
    }
  };
  console.log(isLoading);
  async function alltasks(title, status) {
    setIsLoading(true);
    try {
      const response = await privateInstance.get(TASKS_URLS.GET_ALL, {
        params: {
          title,
          status,
        },
      });
      setTasks(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function alluser() {
    setIsLoading(true);
    try {
      const response = await privateInstance.get(USERS_URLS.GET_ALL_USERS);
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function allproject() {
    setIsLoading(true);
    try {
      const response = await privateInstance.get(
        PROJECTS_URLS.GET_ALL_PROJECTS
      );
      setProject(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    alltasks(SearchQueryTasks, StatsTasks);
  }, [SearchQueryTasks, StatsTasks]);
  useEffect(() => {
    alluser();
  }, []);
  useEffect(() => {
    allproject();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  console.log(user);
  console.log(project);
  console.log(SearchQueryTasks);
  return (
    <AuthContext.Provider
      value={{
        loginData,
        saveLoginData,
        tasks,
        setTasks,
        isLoading,
        setSearchQueryTasks,
        StatsTasks,
        setStatsTasks,
        project,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (authContext === null) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return authContext;
}
