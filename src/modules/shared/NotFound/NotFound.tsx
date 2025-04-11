import React from 'react'
import NoDataImage from '../../../assets/Images/No-data-image.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <img width={600} src={NoDataImage} alt="No Data Image" />
      <h2>No Data Found</h2>

      <Link to="/dashboard" className="text-decoration-none text-white bg-custom-warning py-2 px-3 rounded-pill mt-5">
        <i className="fas fa-arrow-left me-2"></i>
        Go Back To Home
      </Link>
    </div>
  )
}

export default NotFound
