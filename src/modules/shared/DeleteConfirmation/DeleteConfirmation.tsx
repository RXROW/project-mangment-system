// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import logo from '../../../assets/Images/exclamation.png'
// import { JSX } from 'react'
// interface DeleteConfirmationProps extends React.ComponentProps<typeof Modal> {
//   id: number
//   deletettask: (id: number) => void
//   onHide: () => void
// }
// const DeleteConfirmation = (props: DeleteConfirmationProps): JSX.Element => {
//   const { onHide, id, deletettask } = props
//   const handleDelete = (): void => {
//     deletettask(id)
//     onHide()
//   }
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton></Modal.Header>
//       <Modal.Body>
//         <div className="text-center">
//           <img className="text-center" src={logo} />
//           <h5 className="pt-3">Delete This Item ?</h5>
//           <p className="text-muted fs-5 w-50 text-center mx-auto">
//             are you sure you want to delete this item? if you are sure just
//             click on delete it
//           </p>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="outline-dark" onClick={onHide}>
//           Cancel
//         </Button>
//         <Button variant="outline-danger" onClick={handleDelete}>
//           Delete
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }

// export default DeleteConfirmation
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
