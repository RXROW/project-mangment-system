import { useAuthContext } from '../../../context/AuthContext'
import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem('token')
  const { loginData } = useAuthContext()
  return token || loginData ? children : <Navigate to={'/login'} />
}
