import { useEffect, useState, useCallback } from "react";
import logo from "../../../assets/Images/NavLogo.png";
import imgProfile from "../../../assets/Images/NavProf.png";
import { useAuthContext } from "../../../context/AuthContext";
import useThemeContext from "../../../hooks/useThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { privateInstance } from "../../../services/apiConfig";
import { IMAGE_URL, USERS_URLS } from "../../../services/apiUrls";

const Navbar = () => {
  const { loginData } = useAuthContext();
  const { theme } = useThemeContext();

  const [user, setUser] = useState<any>(null);

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await privateInstance.get<any>(USERS_URLS.GET_CURRENT_USER);
      setUser(response?.data);
    } catch (error) {
      console.error("Failed to fetch current user", error);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div className="w-100" style={{
      backgroundColor: theme === "light" ? "#ffffff" : "#0e2416",
    }}>
      <nav

        className={`navbar navbar-expand-lg  border border-0 rounded-3`}>
        <div className="container-fluid">
          <div className="img mx-3">
            <img src={logo} alt="Logo" />
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

            <div className="user-info d-flex w-100 justify-content-end">
              <ThemeToggle />
              <div className="px-3">
                <img
                  src={user?.imagePath ? IMAGE_URL + user.imagePath : imgProfile}
                  className="rounded-circle pe-1"
                  alt="Profile"
                  width={40}
                  height={40}
                />
              </div>

              <div className="d-flex flex-column justify-content-center"
                style={{
                  color: theme === "light" ? "#000000" : "#ffffff",
                }}>
                <p className="m-0">{loginData?.userName}</p>
                <p className="m-0 email">{loginData?.userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
