import { Outlet } from "react-router-dom";
import authlogo from '../../../assets/Images/authlogo.png'

export default function AuthLayout() {


  return (
    <>

<div className="auth-container">
  <div className="container-fluid">
    <div className="row vh-100 justify-content-center align-items-center">
      <div className="col-md-5 d-flex flex-column align-items-center ">
        <img className="w-50 mb-3" src={authlogo} alt="Logo" />
        <div className="from-container w-100 rounded-4 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
</div>



</>
  );
}