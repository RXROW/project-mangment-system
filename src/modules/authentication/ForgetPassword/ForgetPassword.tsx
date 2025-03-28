import  { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailValidation, passwordValidation } from '../../../services/validation';
import { publicInstance } from '../../../services/apiConfig';
import { AUTH_URLS } from '../../../services/apiUrls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ForgetPassData } from '../../../interfaces/authInterfaces';



 const ForgetPassword = () => {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgetPassData>();

  const onSubmit : SubmitHandler<ForgetPassData> = async (data) => {
    
    try {
      let response = await publicInstance.post(AUTH_URLS.FORGET_PASSWORD, data)
      console.log(response)
      navigate('/reset-password', { state: { email: data.email }});
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="col-12 auth-bg p-5 ">
      <div className='mb-5 text-start'>
      <p className='m-0 text-light'>Welcome to PMS</p>
      <h2 className='m-0 fs-1' style={{color:"rgba(239, 155, 40, 1)"}}>Forget Password</h2>
      <span className='line'></span>
      </div>

     <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>

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


       
        <button disabled={isSubmitting} type="submit" className='btn auth-btn w-100 rounded-5 text-light submit mt-5'>
        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
          Verify
        </button>

      </form>
    </div>
  );
};
 
 export default ForgetPassword