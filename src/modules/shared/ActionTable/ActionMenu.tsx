import { FC } from 'react'
import { useAuthContext } from '../../../context/AuthContext'

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
  return (
    <>
      {loginData?.userGroup !== 'Manger' && (
        <td>
          <div className="action-menu">
            <button
              className="border-0 bg-transparent"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {name == 'user' && (
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li
                  role="button"
                  className="d-flex align-items-center  text-success mb-2 dropdown-item"
                  onClick={onEdit}
                >
                  <i
                    className={`fa fa-toggle-${
                      user.isActivated ? 'off' : 'on'
                    } me-2`}
                  ></i>
                  <span>{user.isActivated ? 'Deactivate' : 'Activate'}</span>
                </li>
                <li
                  role="button"
                  className="d-flex align-items-center  text-primary dropdown-item"
                  onClick={onView}
                >
                  <i className="fa fa-eye me-2"></i>
                  <span>View</span>
                </li>
              </ul>
            )}
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li role="button" onClick={onView} className="dropdown-item">
                <i className="mx-2 text-success fa-regular fa-eye"></i>
                View
              </li>
              <li role="button" onClick={onEdit} className="dropdown-item">
                <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>
                Edit
              </li>
              <li role="button" onClick={onDelete} className="dropdown-item ">
                <i className="mx-2 text-success fa-solid fa-trash-can"></i>
                Delete
              </li>
            </ul>
          </div>
        </td>
      )}
    </>
  )
}

export default ActionMenu
