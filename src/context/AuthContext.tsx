import { createContext, useContext, useEffect, useState,useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { privateInstance } from "../services/apiConfig";
import { TASKS_URLS } from "../services/apiUrls";

// Define the props for the AuthContextProvider
type AuthContextProviderProps = {
  children: React.ReactNode;
};

// Define the structure of the decoded JWT
interface DecodedToken {
  userName: string;
  userEmail: string;
  userGroup: string;
}

// Define the structure of a Task
interface Task {
  id: number;
  title: string;
  status: string;
  description: string;
  creationDate: string;
  employee?: {
    userName: string;
  };
}

// Define the type for the context
interface AuthContextType {
  loginData: DecodedToken | null;
  saveLoginData: () => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isLoading: boolean;
  setSearchQueryTasks: React.Dispatch<React.SetStateAction<string>>;
  StatsTasks: string;
  setStatsTasks: React.Dispatch<React.SetStateAction<string>>;
  alltasks: (
    pageSize?: number,
    pageNumber?: number,
    title?: string,
    status?: string
  ) => Promise<void>;
  userfortask: any[];
  setUserfortask: React.Dispatch<React.SetStateAction<any[]>>;
  paginationtask: {
    currentPage: number;
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  };
  setpaginationtask: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      totalNumberOfRecords: number;
      totalNumberOfPages: number;
    }>
  >;
}

interface AuthContextType {
  loginData: DecodedToken | null;
  saveLoginData: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [SearchQueryTasks, setSearchQueryTasks] = useState<string>("");
  const [StatsTasks, setStatsTasks] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userfortask, setUserfortask] = useState([]);
  const [paginationtask, setpaginationtask] = useState({
    currentPage: 1, // current page number
    totalNumberOfRecords: 0, //all item in database
    totalNumberOfPages: 0, // number of item in one page
  });
export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);
  const lastTokenRef = useRef<string | null>(localStorage.getItem("token"));

  const saveLoginData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginData(null);
      return;
    }
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

  async function alltasks(
    pageSize?: number,
    pageNumber?: number,
    title?: string,
    status?: string
  ): Promise<void> {
    setIsLoading(true);
    try {
      const response = await privateInstance.get(TASKS_URLS.GET_ALL, {
        params: {
          pageSize,
          pageNumber,
          title,
          status,
        },
      });
      setpaginationtask({
        currentPage: response?.data?.pageNumber,
        totalNumberOfRecords: response?.data?.totalNumberOfRecords,
        totalNumberOfPages: response?.data?.totalNumberOfPages,
      });
      console.log(response);
      setTasks(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(paginationtask, "paginationtask");

  useEffect(() => {
    alltasks(4, paginationtask.currentPage, SearchQueryTasks, StatsTasks);
  }, [paginationtask.currentPage, SearchQueryTasks, StatsTasks]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  console.log(userfortask, "userfortask");
  console.log(tasks, "tasks");
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
        alltasks,
        userfortask,
        setUserfortask,
        paginationtask,
        setpaginationtask,
      }}
    >
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
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );

  }
  return authContext;
}
