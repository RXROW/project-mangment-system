import { FC } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { ViewDetailsModalProps } from "../../../interfaces/authInterfaces";
 

const ViewDetailsModal: FC<ViewDetailsModalProps> = ({
    show,
    handleClose,
    details,
    loading,
}) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const user = details;

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center py-4">
                        <Spinner animation="border" variant="warning" />
                    </div>
                ) : !user ? (
                    <div className="text-center py-4">
                        <p>User details not available.</p>
                    </div>
                ) : (
                    <div className="user-details-container">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <h5 className="mb-3">Basic Information</h5>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">Username:</td>
                                            <td>{user.userName}</td>
                                        </tr>
                                        {user.firstName && (
                                            <tr>
                                                <td className="fw-bold">First Name:</td>
                                                <td>{user.firstName}</td>
                                            </tr>
                                        )}
                                        {user.lastName && (
                                            <tr>
                                                <td className="fw-bold">Last Name:</td>
                                                <td>{user.lastName}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="fw-bold">Email:</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Phone Number:</td>
                                            <td>{user.phoneNumber || "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Country:</td>
                                            <td>{user.country || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <h5 className="mb-3">Account Information</h5>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">User ID:</td>
                                            <td>{user.id}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Status:</td>
                                            <td>
                                                {user.isActivated ? (
                                                    <span className="badge bg-success">Active</span>
                                                ) : (
                                                    <span className="badge bg-danger">Non-Active</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Created On:</td>
                                            <td>{formatDate(user.creationDate)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {user.groups && user.groups.length > 0 && (
                            <div className="row mt-4">
                                <div className="col-12">
                                    <h5 className="mb-3">Groups</h5>
                                    <div className="d-flex flex-wrap gap-2">
                                        {user.groups.map((group:any, index:any) => (
                                            <span key={index} className="badge bg-info">
                                                {group}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewDetailsModal;