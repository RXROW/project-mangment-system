import Modal from "react-bootstrap/Modal";

interface TaskDetailsModalProps {
  show: boolean;
  onHide: () => void;
  task: {
    title: string;
    description: string;
    status: string;
    employee?: { userName: string };
    creationDate: string;
  } | null;
}

function TaskDetailsModal({ show, onHide, task }: TaskDetailsModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {task ? (
          <div>
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Assigned User:</strong> {task.employee?.userName}
            </p>
            <p>
              <strong>Creation Date:</strong>
              {new Date(task.creationDate).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>No task selected.</p>
        )}
      </Modal.Body>
    </Modal>
  );
}
export default TaskDetailsModal;
