import { FC } from 'react'
import { Modal, Button, Spinner, Badge } from 'react-bootstrap'
// import { ViewDetailsModalProps } from '../../../interfaces/authInterfaces'
import { formatDate } from '../../shared/helperFunctions/formatDate'
import useThemeContext from '../../../hooks/useThemeContext'

const ViewDetailsModal: FC<any> = ({
  show,
  handleClose,
  details,
  loading,
  type = 'user', // 'user' | 'project'
}) => {
  const { theme } = useThemeContext()
  const isDarkMode = theme === 'dark'

  const darkModeClasses = isDarkMode ? {
    modal: 'bg-dark text-light',
    header: 'border-secondary bg-dark text-light',
    closeButton: 'btn-close-white',
    table: 'table-dark'
  } : {}

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" contentClassName={darkModeClasses.modal}>
      <Modal.Header closeButton className={darkModeClasses.header}>
        <Modal.Title>
          {type === 'project'
            ? 'Project Details'
            : type === 'task'
              ? 'Task Details'
              : 'User Details'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={isDarkMode ? 'bg-dark text-light' : ''}>
        {loading ? (
          <div className="d-flex justify-content-center py-4">
            <Spinner animation="border" variant={isDarkMode ? "light" : "warning"} />
          </div>
        ) : !details ? (
          <div className="text-center py-4">
            <p>Details not available.</p>
          </div>
        ) : type === 'project' ? (
          <ProjectDetails details={details} isDarkMode={isDarkMode} />
        ) : type === 'task' ? (
          <TaskDetails details={details} isDarkMode={isDarkMode} />
        ) : (
          <UserDetails details={details} isDarkMode={isDarkMode} />
        )}
      </Modal.Body>
      <Modal.Footer className={isDarkMode ? 'bg-dark text-light border-secondary' : ''}>
        <Button variant={isDarkMode ? "outline-light" : "secondary"} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

// User Details Component
const UserDetails = ({ details, isDarkMode }: { details: any, isDarkMode: boolean }) => {
  const tableClass = isDarkMode ? 'table table-borderless table-dark' : 'table table-borderless'

  return (
    <div className="user-details-container">
      <div className="row mb-3">
        <div className="col-md-6">
          <h5 className="mb-3">Basic Information</h5>
          <table className={tableClass}>
            <tbody>
              <tr>
                <td className="fw-bold">Username:</td>
                <td>{details.userName}</td>
              </tr>
              {details.firstName && (
                <tr>
                  <td className="fw-bold">First Name:</td>
                  <td>{details.firstName}</td>
                </tr>
              )}
              {details.lastName && (
                <tr>
                  <td className="fw-bold">Last Name:</td>
                  <td>{details.lastName}</td>
                </tr>
              )}
              <tr>
                <td className="fw-bold">Email:</td>
                <td>{details.email}</td>
              </tr>
              <tr>
                <td className="fw-bold">Phone Number:</td>
                <td>{details.phoneNumber || 'N/A'}</td>
              </tr>
              <tr>
                <td className="fw-bold">Country:</td>
                <td>{details.country || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h5 className="mb-3">Account Information</h5>
          <table className={tableClass}>
            <tbody>
              <tr>
                <td className="fw-bold">User ID:</td>
                <td>{details.id}</td>
              </tr>
              <tr>
                <td className="fw-bold">Status:</td>
                <td>
                  {details.isActivated ? (
                    <Badge bg="success">Active</Badge>
                  ) : (
                    <Badge bg="danger">Non-Active</Badge>
                  )}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Created On:</td>
                <td>{formatDate(details.creationDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {details.groups && details.groups.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <h5 className="mb-3">Groups</h5>
            <div className="d-flex flex-wrap gap-2">
              {details.groups.map((group: any, index: any) => (
                <Badge key={index} bg={isDarkMode ? "primary" : "info"}>
                  {group}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Project Details Component
const ProjectDetails = ({ details, isDarkMode }: { details: any, isDarkMode: boolean }) => {
  const tableClass = isDarkMode ? 'table table-borderless table-dark' : 'table table-borderless'

  return (
    <div className="project-details-container">
      <div className="row mb-3">
        <div className="col-md-6">
          <h5 className="mb-3">Basic Information</h5>
          <table className={tableClass}>
            <tbody>
              <tr>
                <td className="fw-bold">Title:</td>
                <td>{details.title}</td>
              </tr>
              <tr>
                <td className="fw-bold">Description:</td>
                <td>{details.description || 'N/A'}</td>
              </tr>
              <tr>
                <td className="fw-bold">Tasks Count:</td>
                <td>{details.task?.length || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h5 className="mb-3">Status Information</h5>
          <table className={tableClass}>
            <tbody>
              <tr>
                <td className="fw-bold">Project ID:</td>
                <td>{details.id}</td>
              </tr>
              <tr>
                <td className="fw-bold">Status:</td>
                <td>
                  {details.isActivated ? (
                    <Badge bg="danger">Non-Active</Badge>
                  ) : (
                    <Badge bg="success">Active</Badge>
                  )}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">Created On:</td>
                <td>{formatDate(details.creationDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const TaskDetails = ({ details, isDarkMode }: { details: any, isDarkMode: boolean }) => {
  return (
    <div className={isDarkMode ? "text-light" : ""}>
      {details ? (
        <div>
          <p>
            <strong>Title:</strong> {details.title}
          </p>
          <p>
            <strong>Description:</strong> {details.description}
          </p>
          <p>
            <strong>Status:</strong> {details.status}
          </p>
          <p>
            <strong>Assigned User:</strong> {details.employee?.userName}
          </p>
          <p>
            <strong>Creation Date:</strong>{' '}
            {new Date(details.creationDate).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No task selected.</p>
      )}
    </div>
  )
}

export default ViewDetailsModal