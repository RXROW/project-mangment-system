import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import ChangePassword from './modules/authentication/ChangePassword/ChangePassword'
import ForgetPassword from './modules/authentication/ForgetPassword/ForgetPassword'
import Login from './modules/authentication/Login/Login'
import Registration from './modules/authentication/Registration/Registration'
import ResetPassword from './modules/authentication/ResetPassword/ResetPassword'
import Verification from './modules/authentication/Verification/Verification'
import AuthLayout from './modules/shared/AuthLayout/AuthLayout'
import NotFound from './modules/shared/NotFound/NotFound'
import { Bounce, ToastContainer } from 'react-toastify'
import Dashboard from './modules/dashboard/Dashboard'
import MasterLayout from './modules/shared/MasterLayout/MasterLayout'
import ProtectedRoute from './modules/shared/ProtectedRoute/ProtectedRoute'
import Tasklist from './modules/Task/Tasklist'
import Taskdata from './modules/Task/Taskdata'
import UserList from './modules/users/userList/UserList'
import Projects from './modules/Projects/Projects'
import ProjectForm from './modules/Projects/ProjectForm'

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Registration /> },
        { path: 'verify-user', element: <Verification /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'change-password', element: <ChangePassword /> },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'tasks', element: <Tasklist /> },
        { path: 'tasks/newtask', element: <Taskdata /> },
        { path: 'tasks/:taskId', element: <Taskdata /> },
        { path: 'users', element: <UserList /> },
        { path: 'projects', element: <Projects /> },
        { path: 'projects/new-project', element: <ProjectForm /> },
        { path: 'projects/:projectId', element: <ProjectForm /> },
      ],
    },
  ])

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}

export default App
