import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import leftIcon from "../../../assets/Images/chevron-left.png";
import rightIcon from "../../../assets/Images/chevron-right.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const SideMenu = () => {
  const { loginData } = useAuthContext();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  const toggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="sidebar-container vh-100 ">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <div
              onClick={toggle}
              className={`icon-left ${isCollapsed ? "icon-right" : ""}`}
            >
              {isCollapsed ? (
                <img src={rightIcon} alt="" />
              ) : (
                <img src={leftIcon} alt="" />
              )}
            </div>

            <MenuItem
              component={<Link to="/dashboard" />}
              title="home"
              icon={<i className="fa fa-home"></i>}
              active={activeItem === "home"}
              onClick={() => handleItemClick("home")}
            >
              Home
            </MenuItem>
            {loginData?.userGroup !== "Employee" && (
              <MenuItem
                component={<Link to="/dashboard/users" />}
                title="users"
                icon={<i className="fa-sharp fa-solid fa-users"></i>}
                active={activeItem === "users"}
                onClick={() => handleItemClick("users")}
              >
                Users
              </MenuItem>
            )}
            <MenuItem
              component={<Link to="#" />}
              title="projects"
              icon={<i className="fa-solid fa-chart-column"></i>}
              active={activeItem === "projects"}
              onClick={() => handleItemClick("projects")}
            >
              Projects
            </MenuItem>

            <MenuItem
              component={<Link to="tasklist" />}
              title="tasks"
              icon={<i className="fa fa-list-check"></i>}
              active={activeItem === "tasks"}
              onClick={() => handleItemClick("tasks")}
            >
              {" "}
              Tasks
            </MenuItem>

            <MenuItem
              component={<Link to="/login" />}
              title="logout"
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              active={activeItem === "logout"}
              onClick={() => {
                handleItemClick("logout");
                localStorage.removeItem("token");
              }}
            >
              {" "}
              Log out{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SideMenu;
