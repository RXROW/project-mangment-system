import { FC } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import useThemeContext from '../../../hooks/useThemeContext'

interface ActionMenuProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  name?: string
  user?: any
}

const ActionMenu: FC<ActionMenuProps> = ({
  onView,
  onEdit,
  onDelete,
  name,
  user,
}) => {
  const { loginData } = useAuthContext()
  const { theme } = useThemeContext()
  const isDarkMode = theme === 'dark'

  // Dynamic classes based on theme
  const dropdownMenuClass = isDarkMode
    ? "dropdown-menu dropdown-menu-dark"
    : "dropdown-menu"

  const iconClass = isDarkMode
    ? "mx-2 text-info fa"
    : "mx-2 text-success fa"

  return (
    <>
      {loginData?.userGroup !== 'Manger' && (
        <td className={isDarkMode ? "text-white" : ""}>
          <div className="action-menu">
            <button
              className={`border-0 ${isDarkMode ? 'bg-transparent text-white' : 'bg-transparent'}`}
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {name === 'user' && (
              <ul
                className={dropdownMenuClass}
                aria-labelledby="dropdownMenuButton"
              >
                <li
                  role="button"
                  className={`d-flex align-items-center ${isDarkMode ? 'text-info' : 'text-success'} mb-2 dropdown-item`}
                  onClick={onEdit}
                >
                  <i
                    className={`fa fa-toggle-${user.isActivated ? 'off' : 'on'
                      } me-2`}
                  ></i>
                  <span>{user.isActivated ? 'Deactivate' : 'Activate'}</span>
                </li>
                <li
                  role="button"
                  className={`d-flex align-items-center ${isDarkMode ? 'text-info' : 'text-primary'} dropdown-item`}
                  onClick={onView}
                >
                  <i className="fa fa-eye me-2"></i>
                  <span>View</span>
                </li>
              </ul>
            )}
            {!name && (
              <ul className={dropdownMenuClass} aria-labelledby="dropdownMenuButton">
                <li role="button" onClick={onView} className="dropdown-item">
                  <i className={`${iconClass}-regular fa-eye`}></i>
                  View
                </li>
                <li role="button" onClick={onEdit} className="dropdown-item">
                  <i className={`${iconClass}-regular fa-pen-to-square`}></i>
                  Edit
                </li>
                <li role="button" onClick={onDelete} className="dropdown-item">
                  <i className={`${iconClass}-solid fa-trash-can`}></i>
                  Delete
                </li>
              </ul>
            )}
          </div>
        </td>
      )}
    </>
  )
}

export default ActionMenu