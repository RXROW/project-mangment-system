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
import Button from "../../shared/Button/Button";
import TitleAuth from "../../shared/TitleAuth/TitleAuth";

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
    <div className=" col-12  p-5">
      <TitleAuth name="Create New Account" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex align-items-center justify-content-center mb-3">
          <label htmlFor="profileImage" className="form-label" role="button">
            <input
              {...register("profileImage")}
              type="file"
              className="form-control d-none"
              id="profileImage"
            />
            <img
              src={imgesregister}
              className=" rounded-circle"
              style={{ width: 120, height: 120 }}
              alt=""
            />
          </label>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="pb-3 mb-3">
              <label className="ps-2 color-label my-1">User Name</label>
              <input
                {...register("userName", nameValidation)}
                type="text"
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your name"
              />
              {errors.userName && (
                <span className="text-danger">
                  {String(errors.userName.message)}
                </span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="pb-3 mb-3">
              <label className="ps-2 color-label my-1">E-mail</label>
              <input
                {...register("email", emailValidation)}
                type="text"
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your Email"
              />
              {errors.email && (
                <span className="text-danger">
                  {String(errors.email.message)}
                </span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="pb-3 mb-3">
              <label className="ps-2 color-label my-1">Country</label>
              <input
                {...register("country", countryValidation)}
                type="text"
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your country"
              />
              {errors.country && (
                <span className="text-danger">
                  {String(errors.country.message)}
                </span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="pb-3 mb-3">
              <label className="ps-2 color-label my-1">phone Number</label>
              <input
                {...register("phoneNumber", phoneValidation)}
                type="text"
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <span className="text-danger">
                  {String(errors.phoneNumber.message)}
                </span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="pb-3 mb-3  position-relative  ">
              <label className="ps-2 color-label my-1">Password</label>
              <input
                {...register("password", passwordValidation)}
                type={showpassword ? `password` : `text`}
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Enter your Password"
              />
              <PasswordToggle onToggle={setshowpassword} />
              {errors.password && (
                <span className="text-danger">
                  {String(errors.password.message)}
                </span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="pb-3 mb-3 position-relative">
              <label className="ps-2 color-label my-1">Confirm Password</label>
              <input
                {...register(
                  "confirmPassword",
                  confirmPasswordValidation(password)
                )}
                type={showconfirmpassword ? `password` : `text`}
                className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
                placeholder="Confirm New Password"
              />
              <PasswordToggle onToggle={setshowconfirmpassword} />
              {errors.confirmPassword && (
                <span className="text-danger">
                  {String(errors.confirmPassword.message)}
                </span>
              )}
            </div>
          </div>
          <div className="col-md-8 d-flex justify-content-center align-items-center mx-auto">
            <Button isSubmitting={isSubmitting}>save</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
