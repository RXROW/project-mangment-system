import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  emailValidation,
  passwordValidation,
} from '../../../services/validation'
import { publicInstance } from '../../../services/apiConfig'
import { AUTH_URLS } from '../../../services/apiUrls'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ResetData } from '../../../interfaces/authInterfaces'
import PasswordToggle from '../../../hooks/PasswordToggle'
import Button from '../../shared/Button/Button'
import TitleAuth from '../../shared/TitleAuth/TitleAuth'
// import { ResetPasswordData } from '../Interfaces/Interfaces';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetData>()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(true)
  const [showNewPassword, setShowNewPassword] = useState(true)
  const onSubmit: SubmitHandler<ResetData> = async (data) => {
    try {
      const response = await publicInstance.post(AUTH_URLS.RESET_PASSWORD, data)
      navigate('/login')
      toast.success(' Change Password Successfully')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className="col-12 auth-bg p-5 ">
      <TitleAuth name="Reset Password" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email  */}
        <div className="position-relative">
          <label className="position-absolute start-0 top-0 px-2 color-label ">
            E-mail
          </label>
          <input
            {...register('email', emailValidation)}
            type="email"
            className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom text-white"
            placeholder="Enter your Email"
          />
        </div>
        {errors.email && (
          <span className="text-danger">{String(errors.email.message)}</span>
        )}

        {/* OTP  */}

        <div className="position-relative mt-3">
          <label className="position-absolute start-0 top-0 px-2  color-label">
            OTP Verification
          </label>
          <input
            {...register('seed', { required: 'OTP is required' })}
            type="text"
            className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom text-white"
            placeholder="Enter Verification"
          />
        </div>
        {errors.seed && (
          <span className="text-danger">{String(errors.seed.message)}</span>
        )}

        {/* New Pass  */}

        <div className="position-relative mt-3">
          <label className="position-absolute start-0 top-0 px-2 color-label">
            New Password
          </label>
          <input
            {...register('password', passwordValidation)}
            type={showPassword ? 'text' : 'password'}
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
          <PasswordToggle onToggle={setShowPassword} />
        </div>
        {errors.password && (
          <span className="text-danger">{String(errors.password.message)}</span>
        )}

        {/* Confirm Pass  */}

        <div className="position-relative mt-3">
          <label className="position-absolute start-0 top-0 px-2 color-label">
            Confirm Password
          </label>
          <input
            {...register('confirmPassword', passwordValidation)}
            type={showNewPassword ? 'text' : 'password'}
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
          <PasswordToggle onToggle={setShowNewPassword} />
        </div>
        {errors.confirmPassword && (
          <span className="text-danger">{errors.confirmPassword.message}</span>
        )}

        <Button isSubmitting={isSubmitting}>save</Button>
      </form>
    </div>
  )
}

export default ResetPassword
