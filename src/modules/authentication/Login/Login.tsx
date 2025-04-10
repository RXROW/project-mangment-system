import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  emailValidation,
  passwordValidation,
} from '../../../services/validation'
import { publicInstance } from '../../../services/apiConfig'
import { AUTH_URLS } from '../../../services/apiUrls'
import { LoginData } from '../../../interfaces/authInterfaces'
import PasswordToggle from '../../../hooks/PasswordToggle'
import { toast } from 'react-toastify'
import Button from '../../shared/Button/Button'
import TitleAuth from '../../shared/TitleAuth/TitleAuth'
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>()
  const [showPassword, setShowPassword] = useState(true)
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await publicInstance.post(AUTH_URLS.LOGIN, data)
      console.log(response)
      const token = response?.data?.token
      localStorage.setItem('token', token)
      // console.log(token)
      navigate('/dashboard')
      toast.success('Login Successfuly')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="col-12 p-5">
      <TitleAuth name="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="position-relative">
          <label className="position-absolute start-0 top-0 px-2 color-label">
            E-mail
          </label>
          <input
            {...register('email', emailValidation)}
            type="email"
            className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
            placeholder="Enter your Email"
          />
        </div>
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}

        <div className="position-relative mt-4">
          <label className="position-absolute start-0 top-0 px-2 color-label">
            Password
          </label>
          <input
            {...register('password', passwordValidation)}
            type={showPassword ? 'password' : 'text'}
            className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
            placeholder="Enter your Password"
          />
          <PasswordToggle onToggle={setShowPassword} />
        </div>
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}

        <div className="links d-flex justify-content-between my-4">
          <Link to="/register" className="text-light text-decoration-none">
            Register Now?
          </Link>
          <Link
            to="/forget-password"
            className="text-light text-decoration-none"
          >
            Forget Password?
          </Link>
        </div>
        <Button isSubmitting={isSubmitting}> Login</Button>
      </form>
    </div>
  )
}

export default Login
