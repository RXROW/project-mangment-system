import { useState } from 'react'
import {  passwordValidation } from '../../../services/validation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { privateInstance } from '../../../services/apiConfig'
import { AUTH_URLS } from '../../../services/apiUrls'

 
 interface ChangeData {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

const ChangePassword = () => {
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ChangeData>();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit : SubmitHandler<ChangeData> = async (data) => {
      try {
        const response = await privateInstance.put(AUTH_URLS.CHANGE_PASSWORD, data)
            console.log(response);
      } catch (error) {
        console.log(error)
      } 
    };
    
  
   return (
    <div className="col-12 auth-bg p-5 ">
    <div className='mb-5 text-start'>
    <p className='m-0 text-light'>Welcome to PMS</p>
    <h2 className='m-0 fs-1' style={{color:"rgba(239, 155, 40, 1)"}}>Change Password</h2>
    <span className='line'></span>
    </div>

   <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>


<div className="position-relative mt-4">
<label 
  className="position-absolute start-0 top-0 px-2" 
  style={{ color: "rgba(239, 155, 40, 1)" }}
>
  Old Password
</label>
<input
  {...register("oldPassword", passwordValidation)}
  type={showOldPassword ? "text" : "password"}
  className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
  placeholder="Enter your Password"
/>
<button
  className="btn bg-transparent border-0 position-absolute end-0 top-0"
  type="button"
  onClick={() => setShowOldPassword(!showOldPassword)}
>
  <i className={`fas ${showOldPassword ? "fa-eye-slash" : "fa-eye"} text-light`}></i>
</button>
</div>
{errors.oldPassword && <span className="text-danger">{String(errors.oldPassword.message)}</span>}

<div className="position-relative mt-4">
<label 
  className="position-absolute start-0 top-0 px-2" 
  style={{ color: "rgba(239, 155, 40, 1)" }}
>
  New Password
</label>
<input
  {...register("newPassword", passwordValidation)}
  type={showNewPassword ? "text" : "password"}
  className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
  placeholder="Enter your Password"
/>
<button
  className="btn bg-transparent border-0 position-absolute end-0 top-0"
  type="button"
  onClick={() => setShowNewPassword(!showNewPassword)}
>
  <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"} text-light`}></i>
</button>
</div>
{errors.newPassword && <span className="text-danger">{String(errors.newPassword.message)}</span>}


     
     <div className="position-relative mt-4 ">
  <label 
    className="position-absolute start-0 top-0 px-2" 
    style={{ color: "rgba(239, 155, 40, 1)" }}
  >
    Confirm New Password
  </label>
  <input
    {...register("confirmNewPassword", {
      ...passwordValidation, 
      validate: (value) =>
        value === watch("newPassword") || "Passwords do not match",
    })}
    type={showConfirmPassword ? "text" : "password"}
    className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
    placeholder="Enter your Password"
  />
  <button
    className="btn bg-transparent border-0 position-absolute end-0 top-0"
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-light`}></i>
  </button>
</div>
{errors.confirmNewPassword && <span className="text-danger">{String(errors.confirmNewPassword.message)}</span>}

      

     
      <button disabled={isSubmitting} type="submit" className='btn auth-btn w-100 rounded-5 text-light submit mt-5'>
      {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
        Save
      </button>

    </form>
  </div>
   )
 }
 
 export default ChangePassword