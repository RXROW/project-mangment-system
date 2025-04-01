import { Outlet, useLocation } from "react-router-dom";
import authlogo from "../../../assets/Images/authlogo.png";

export default function AuthLayout() {
  const location = useLocation();
  const register = location.pathname;
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid">
          <div className="row min-vh-100 justify-content-center align-items-center">
            <div
              className={`${
                register === "/register"
                  ? "col-md-10 col-12"
                  : "col-md-6 col-sm-9"
              } d-flex flex-column align-items-center  mb-4 `}
            >
              <img
                className=" mb-3"
                style={{ maxWidth: 400 }}
                src={authlogo}
                alt="Logo"
              />
              <div
                className={`${
                  register === "/register"
                    ? "from-container-register"
                    : "from-container"
                } w-100 rounded-4 `}
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
