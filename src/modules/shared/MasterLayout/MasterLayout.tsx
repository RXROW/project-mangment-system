import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  return (
    <>
      <div className="master-container vh-100">
        <div className="navbar p-0">
          <Navbar />
        </div>
        <div className="content-container min-vh-100 d-flex">
          <div className="sidebar h-full ">
            <SideMenu />
          </div>
          <div className="content overflow-hidden bg-light w-100  ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
};

export default MasterLayout;
