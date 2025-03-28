/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubmitHandler, useForm } from "react-hook-form";
import {
  confirmPasswordValidation,
  countryValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
} from "../../../services/validation";
import { publicInstance } from "../../../services/apiConfig";
import imgesregister from "../../../assets/Images/Regsiter-img.png";
import { AUTH_URLS } from "../../../services/apiUrls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterData } from "../../../interfaces/authInterfaces";
import PasswordToggle from "../../../hooks/PasswordToggle";
const Registration = () => {
  const [showconfirmpassword, setshowconfirmpassword] = useState(true);
  const [showpassword, setshowpassword] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      const typedKey = key as keyof RegisterData;
      if (typedKey === "profileImage") {
        formData.append(typedKey, data.profileImage?.[0] as File);
      } else {
        formData.append(typedKey, String(data[typedKey]));
      }
    }
    try {
      await publicInstance.post(AUTH_URLS.REGISTER, formData);
      navigate("/verify-user", { state: { email: data.email } });
      toast.success("check Your Email ");
    } catch (error: unknown) {
      toast.error(error.response.data.message || " Error Happen");
    }
  };
  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [confirmPassword, trigger, password]);
  return (
    <>
      <div className="p-2">
        <div className=" text-start">
          <p className="m-0 text-light">Welcome to PMS</p>
          <h2 className="m-0 fs-1 color-label">Create New Account</h2>
          <span className="line"></span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor=" profileImage" className="form-label  w-100  ">
          <div className="d-flex align-items-center justify-content-center">
            <input
              {...register("profileImage")}
              type="file"
              className="form-control d-none"
              id=" profileImage"
            />
            <img src={imgesregister} alt="" />
          </div>
        </label>
        <div className="d-flex gap-5 pb-3">
          <div className="first-colum w-100">
            <div className="pb-3">
              <label className="ps-2 color-label">User Name</label>
              <input
                {...register("userName", nameValidation)}
                type="text"
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your name"
              />
            </div>
            {errors.userName && (
              <span className="text-danger">
                {String(errors.userName.message)}
              </span>
            )}
            <div className="pb-3">
              <label className="ps-2 color-label">Country</label>
              <input
                {...register("country", countryValidation)}
                type="text"
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your country"
              />
            </div>
            {errors.country && (
              <span className="text-danger">
                {String(errors.country.message)}
              </span>
            )}
            <div className="pb-3  position-relative ">
              <label className="ps-2 color-label">Password</label>
              <input
                {...register("password", passwordValidation)}
                type={showpassword ? `password` : `text`}
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your Password"
              />
              <PasswordToggle onToggle={setshowpassword} />
            </div>
            {errors.password && (
              <span className="text-danger">
                {String(errors.password.message)}
              </span>
            )}
          </div>
          <div className="second-colums w-100">
            <div className="pb-3">
              <label className="ps-2 color-label">E-mail</label>
              <input
                {...register("email", emailValidation)}
                type="text"
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your Email"
              />
            </div>
            {errors.email && (
              <span className="text-danger">
                {String(errors.email.message)}
              </span>
            )}
            <div className="pb-3">
              <label className="ps-2 color-label">phone Number</label>
              <input
                {...register("phoneNumber", phoneValidation)}
                type="text"
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-danger">
                {String(errors.phoneNumber.message)}
              </span>
            )}
            <div className="pb-3 position-relative">
              <div className="w-100">
                <label className="ps-2 color-label">Confirm Password</label>
                <input
                  {...register(
                    "confirmPassword",
                    confirmPasswordValidation(password)
                  )}
                  type={showconfirmpassword ? `password` : `text`}
                  className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                  placeholder="Confirm New Password"
                />
              </div>
              <PasswordToggle onToggle={setshowconfirmpassword} />
            </div>
            {errors.confirmPassword && (
              <span className="text-danger">
                {String(errors.confirmPassword.message)}
              </span>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn auth-btn  w-75 rounded-5 text-light submit"
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>
            )}
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Registration;
