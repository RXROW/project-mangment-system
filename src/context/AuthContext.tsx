import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'
import { privateInstance } from '../services/apiConfig'
import { TASKS_URLS } from '../services/apiUrls'
import {
  CurrentTask,
  Employee,
  PaginationTask,
  projectfortask,
  TaskContextState,
  TaskStatus,
} from '../interfaces/taskinterface'

// Define the props for the AuthContextProvider
type AuthContextProviderProps = {
  children: React.ReactNode
}

// Define the structure of the decoded JWT
interface DecodedToken {
  userName: string
  userEmail: string
  userGroup: string
}

// Define the structure of a Task
interface AuthContextType extends TaskContextState {
  loginData: DecodedToken | null
  saveLoginData: () => void
  logout: () => void
  projectfortask: projectfortask[]
  setprojectfortask: React.Dispatch<React.SetStateAction<projectfortask[]>>
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null)
  const [SearchQueryTasks, setSearchQueryTasks] = useState<string>('')
  const [tasks, setTasks] = useState<CurrentTask[]>([])
  const [userfortask, setUserfortask] = useState<Employee[]>([])
  const [paginationtask, setpaginationtask] = useState<PaginationTask>({
    currentPage: 1,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  })
  // Auth State
  const [StatsTasks, setStatsTasks] = useState<TaskStatus>('ToDo')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [projectfortask, setprojectfortask] = useState<projectfortask[]>([])
  const lastTokenRef = useRef<string | null>(localStorage.getItem('token'))
  const saveLoginData = () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const decoded: DecodedToken = jwtDecode(token)
      setLoginData(decoded)
    } catch (error) {
      console.error('Error decoding token:', error)
      localStorage.removeItem('token')
      setLoginData(null)
    }
  }
  async function alltasks(
    pageSize?: number,
    pageNumber?: number,
    title?: string,
    status?: string
  ): Promise<void> {
    setIsLoading(true)
    try {
      const response = await privateInstance.get(TASKS_URLS.GET_ALL, {
        params: {
          pageSize,
          pageNumber,
          title,
          status,
        },
      })
      setpaginationtask({
        currentPage: response?.data?.pageNumber,
        totalNumberOfRecords: response?.data?.totalNumberOfRecords,
        totalNumberOfPages: response?.data?.totalNumberOfPages,
      })
      console.log(response)
      setTasks(response?.data?.data || [])
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    alltasks(4, paginationtask.currentPage, SearchQueryTasks, StatsTasks)
  }, [paginationtask.currentPage, SearchQueryTasks, StatsTasks])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveLoginData()
    }
  }, [])
  const logout = () => {
    localStorage.removeItem('token')
    setLoginData(null)
  }
  useEffect(() => {
    saveLoginData()
    const checkTokenChange = () => {
      const currentToken = localStorage.getItem('token')
      if (currentToken !== lastTokenRef.current) {
        lastTokenRef.current = currentToken
        saveLoginData()
      }
    }

    const interval = setInterval(checkTokenChange, 100)

    return () => clearInterval(interval)
  }, [])

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
        logout,
        projectfortask,
        setprojectfortask,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const authContext = useContext(AuthContext)
  if (authContext === null) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return authContext
}
