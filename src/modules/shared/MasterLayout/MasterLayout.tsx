import useThemeContext from "../../../hooks/useThemeContext";
import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  const { theme } = useThemeContext();

  return (
    <div className="master-container vh-100 d-flex flex-column overflow-hidden">
      <div className="navbar p-0">
        <Navbar />
      </div>
      <div className="content-container d-flex flex-grow-1 overflow-hidden">
        <div className="sidebar h-100">
          <SideMenu />
        </div>
        <div
          style={{
            backgroundColor: theme === "light" ? "#ffffff" : "#101418",
          }}
          className="content w-100 overflow-auto"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
