import { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import leftIcon from '../../../assets/Images/chevron-left.png'
import rightIcon from '../../../assets/Images/chevron-right.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext'

const SideMenu = () => {
  const { loginData, logout } = useAuthContext()
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768)
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(
    location.pathname.split('/').pop()
  )
  console.log(activeItem)
  console.log(location)
  const navigate = useNavigate()
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)
  }

  const toggle = () => {
    setIsCollapsed((prev) => !prev)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
      setIsCollapsed(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <div
            onClick={toggle}
            className={`icon-left ${isCollapsed ? 'icon-right' : ''}`}
          >
            <img src={isCollapsed ? rightIcon : leftIcon} alt="toggle icon" />
          </div>
          <MenuItem
            component={<Link to="/dashboard" />}
            title="Home"
            icon={<i className="fa fa-home"></i>}
            active={activeItem === 'dashboard'}
            onClick={() => handleItemClick('dashboard')}
          >
            Home
          </MenuItem>
          {loginData?.userGroup !== 'Employee' && (
            <MenuItem
              component={<Link to="users" />}
              title="Users"
              icon={<i className="fa-sharp fa-solid fa-users"></i>}
              active={activeItem === 'users'}
              onClick={() => handleItemClick('users')}
            >
              Users
            </MenuItem>
          )}
          <MenuItem
            component={<Link to="projects" />}
            title="projects"
            icon={<i className="fa-solid fa-chart-column"></i>}
            active={activeItem === 'projects'}
            onClick={() => handleItemClick('projects')}
          >
            {' '}
            Projects
          </MenuItem>
          <MenuItem
            component={<Link to="tasks" />}
            title="Tasks"
            icon={<i className="fa fa-list-check"></i>}
            active={activeItem === 'tasks'}
            onClick={() => handleItemClick('tasks')}
          >
            Tasks
          </MenuItem>
          <MenuItem
            title="Logout"
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            active={activeItem === 'logout'}
            onClick={handleLogout}
          >
            Log out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideMenu
