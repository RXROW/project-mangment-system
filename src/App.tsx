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
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Registration /> },
        { path: "verify-user", element: <Verification /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
  ]);

  return <>
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
        /></>;
}

export default App;
