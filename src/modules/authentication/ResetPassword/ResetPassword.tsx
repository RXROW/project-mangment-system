import  { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailValidation, passwordValidation } from '../../../services/validation';
import { publicInstance } from '../../../services/apiConfig';
import { AUTH_URLS } from '../../../services/apiUrls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ResetData } from '../../../interfaces/authInterfaces';
import PasswordToggle from '../../../hooks/PasswordToggle';
// import { ResetPasswordData } from '../Interfaces/Interfaces';



 
 const ResetPassword = () => {
 const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onSubmit : SubmitHandler<ResetData> = async (data) => {
    
    try {
      let response = await publicInstance.post(AUTH_URLS.RESET_PASSWORD, data)
      console.log(response)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="col-12 auth-bg p-5 ">
      <div className='mb-5 text-start'>
      <p className='m-0 text-light'>Welcome to PMS</p>
      <h2 className='m-0 fs-1' style={{color:"rgba(239, 155, 40, 1)"}}>Reset Password</h2>
      <span className='line'></span>
      </div>

     <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>


{/* Email  */}

<div className="position-relative">
  <label 
    className="position-absolute start-0 top-0 px-2 " 
    style={{ color: "rgba(239, 155, 40, 1)" }}
  >
    E-mail
  </label>
  <input
    {...register("email", emailValidation)}
    type="email"
    className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom text-white"
    placeholder="Enter your Email"
  />
</div>
{errors.email && <span className="text-danger">{String(errors.email.message)}</span>}

{/* OTP  */}

<div className="position-relative mt-3">
  <label 
    className="position-absolute start-0 top-0 px-2 " 
    style={{ color: "rgba(239, 155, 40, 1)" }}
  >
    OTP Verification
  </label>
  <input
    {...register("seed", {required: 'OTP is required'})}
    type="text"
    className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom text-white"
    placeholder="Enter Verification"
  />
</div>
{errors.seed && <span className="text-danger">{String(errors.seed.message)}</span>}

{/* New Pass  */}

<div className="position-relative mt-3">
  <label 
    className="position-absolute start-0 top-0 px-2" 
    style={{ color: "rgba(239, 155, 40, 1)" }}
  >
    New Password
  </label>
  <input
    {...register("password", passwordValidation)}
    type={showPassword ? "text" : "password"}
    className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom text-white"
    placeholder="Enter Your New Password"
  />
  {/* <button
    className="btn bg-transparent border-0 position-absolute end-0 top-0 mt-2"
    type="button"
    onClick={() => setShowPassword(!showPassword)}
  >
    <i className={fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-light}></i>
  </button> */}
          <PasswordToggle onToggle={setShowPassword}/>
</div>
{errors.password && <span className="text-danger">{String(errors.password.message)}</span>}

{/* Confirm Pass  */}

<div className="position-relative mt-3">
  <label 
    className="position-absolute start-0 top-0 px-2" 
    style={{ color: "rgba(239, 155, 40, 1)" }}
  >
    Confirm Password
  </label>
  <input
    {...register("confirmPassword", passwordValidation)}
    type={showNewPassword ? "text" : "password"}
    className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom text-white"
    placeholder="Confirm New Password"
  />
  {/* <button
    className="btn bg-transparent border-0 position-absolute end-0 top-0 mt-2"
    type="button"
    onClick={() => setShowNewPassword(!showNewPassword)}
  >
    <i className={fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"} text-light}></i>
  </button> */}
          <PasswordToggle onToggle={setShowNewPassword}/>
</div>
{errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}


       

       
        <button disabled={isSubmitting} type="submit" className='btn auth-btn w-100 rounded-5 text-light submit mt-5'>
        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
          Save
        </button>

      </form>
    </div>
  );
};
 
export default ResetPassword