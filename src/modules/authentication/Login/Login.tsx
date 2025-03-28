import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailValidation, passwordValidation } from '../../../services/validation';
import { publicInstance } from '../../../services/apiConfig';
import { AUTH_URLS } from '../../../services/apiUrls';
import { LoginData } from '../../../interfaces/authInterfaces';
import PasswordToggle from '../../../hooks/PasswordToggle';

// interface LoginData {
//   email: string,
//   password: string
// }

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit : SubmitHandler<LoginData> = async (data) => {
    
    try {
      let response = await publicInstance.post(AUTH_URLS.LOGIN, data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="col-12 auth-bg p-5 ">
      <div className='mb-5 text-start'>
      <p className='m-0 text-light'>Welcome to PMS</p>
      <h2 className='m-0 fs-1' style={{color:"rgba(239, 155, 40, 1)"}}>Login</h2>
      <span className='line'></span>
      </div>

     <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>

<div className="position-relative">
  <label 
    className="position-absolute start-0 top-0 px-2" 
    style={{ color: "rgba(239, 155, 40, 1)" }}
  >
    E-mail
  </label>
  <input
    {...register("email", emailValidation)}
    type="email"
    className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
    placeholder="Enter your Email"
  />
</div>
{errors.email && <span className="text-danger">{errors.email.message}</span>}

<div className="position-relative mt-4">
  <label 
    className="position-absolute start-0 top-0 px-2" 
    style={{ color: "rgba(239, 155, 40, 1)" }}
  >
    Password
  </label>
  <input
    {...register("password", passwordValidation)}
    type={showPassword ? "text" : "password"}
    className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
    placeholder="Enter your Password"
  />
  {/* <button
    className="btn bg-transparent border-0 position-absolute end-0 top-0"
    type="button"
    onClick={() => setShowPassword(!showPassword)}
  >
    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-light`}></i>
  </button> */}
          <PasswordToggle onToggle={setShowPassword}/>
</div>
{errors.password && <span className="text-danger">{errors.password.message}</span>}


       
        <div className="links d-flex justify-content-between my-4">
          <Link to='/register' className='text-light text-decoration-none'>
            Register Now?
          </Link>
          <Link to='/forget-password' className='text-light text-decoration-none'>
            Forget Password?
          </Link>
        </div>

       
        <button disabled={isSubmitting} type="submit" className='btn auth-btn w-100 rounded-5 text-light submit'>
        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;
