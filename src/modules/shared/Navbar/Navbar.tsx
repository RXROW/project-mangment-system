// import React from 'react'
import logo from "../../../assets/Images/NavLogo.png";
import imgProfile from "../../../assets/Images/NavProf.png";
import { useAuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { loginData } = useAuthContext();
  return (
    <>
      <div className="w-100">
        <nav className="navbar navbar-expand-lg bg-body-tertiary border border-0 rounded-3">
          <div className="container-fluid">
            <div className="img mx-3">
              <img src={logo} alt="" />
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="user-info  d-flex w-100 justify-content-end">
                <div className="px-3">
                  <img src={imgProfile} alt="" />
                </div>
                <div className="d-flex">
                  <div>
                    <p className="m-0">{loginData?.userName}</p>
                    <p className="m-0 email">{loginData?.userEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
