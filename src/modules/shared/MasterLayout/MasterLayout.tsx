// import Navbar from "../Navbar/Navbar";
// import SideMenu from "../SideMenu/SideMenu";
// import { Outlet } from "react-router-dom";

// const MasterLayout = () => {
//   return (
//     <>
//       <div className="master-container vh-100">
//         <div className="navbar p-0">
//           <Navbar />
//         </div>
//         <div className="content-container min-vh-100 d-flex">
//           <div className="sidebar vh-100">
//             <SideMenu />
//           </div>
//           <div className="content overflow-auto w-100 vh-100 bg-body-secondary">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </>
//   )
// };

// export default MasterLayout;


/**//////////////////////////////////////// */


import Navbar from "../Navbar/Navbar";
import SideMenu from "../SideMenu/SideMenu";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
  return (
    <>
      <div className="master-container vh-100 d-flex flex-column overflow-hidden">
        <div className="navbar p-0">
          <Navbar />
        </div>
        <div className="content-container d-flex flex-grow-1 overflow-hidden">
          <div className="sidebar h-100">
            <SideMenu />
          </div>
          <div style={{backgroundColor:"rgba(245, 245, 245, 1)"}} className="content w-100 overflow-auto ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
