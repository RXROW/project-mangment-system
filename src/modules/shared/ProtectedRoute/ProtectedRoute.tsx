import { useEffect } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import SpinnerPages from '../SpinnerPages/SpinnerPages'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token')
  const { loginData, saveLoginData } = useAuthContext()
  const location = useLocation()
  const allowedRoutes = ['dashboard', 'tasks', 'projects']
  const currentPath =
    location.pathname.split('/')[location.pathname.split('/').length - 1]
  useEffect(() => {
    if (token && !loginData) {
      saveLoginData()
    }
  }, [token, loginData, saveLoginData])

  if (token && !loginData) {
    return (
      <>
        <SpinnerPages />
      </>
    )
  }
  if (!token || !loginData) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  if (loginData.userGroup !== 'Manager') {
    if (!allowedRoutes.includes(currentPath)) {
      return <Navigate to="/login" replace />
    }
  }
  return <>{children}</>
}
