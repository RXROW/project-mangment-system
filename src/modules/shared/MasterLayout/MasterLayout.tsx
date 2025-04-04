import React from "react";
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
          <div className="sidebar vh-100">
            <SideMenu />
          </div>
          <div className="content overflow-auto w-100 vh-100 bg-body-secondary">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
