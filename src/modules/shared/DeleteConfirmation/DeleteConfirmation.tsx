import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

type Props = {
  toggleShow: boolean
  handleClose: () => void
  deleteFunction: () => Promise<void> 
}

const DeleteConfirmation = ({
  toggleShow,
  handleClose,
  deleteFunction,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteFunction()
      handleClose() 
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal show={toggleShow} onHide={handleClose} className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Confirm Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation
