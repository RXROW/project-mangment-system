import { useState } from "react";
import { passwordValidation } from "../../../services/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { privateInstance } from "../../../services/apiConfig";
import { AUTH_URLS } from "../../../services/apiUrls";
import { ChangeData } from "../../../interfaces/authInterfaces";
import PasswordToggle from "../../../hooks/PasswordToggle";
import Button from "../../shared/Button/Button";
import TitleAuth from "../../shared/TitleAuth/TitleAuth";

//  interface ChangeData {
//   oldPassword: string,
//   newPassword: string,
//   confirmNewPassword: string
// }

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangeData>();
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const onSubmit: SubmitHandler<ChangeData> = async (data) => {
    try {
      const response = await privateInstance.put(
        AUTH_URLS.CHANGE_PASSWORD,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-12 auth-bg p-5 ">
      <TitleAuth name="Change Password" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="position-relative mt-4">
          <label className="position-absolute start-0 top-0 px-2 color-label">
            Old Password
          </label>
          <input
            {...register("oldPassword", passwordValidation)}
            type={showOldPassword ? "text" : "password"}
            className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
            placeholder="Enter your Password"
          />
          {/* <button
  className="btn bg-transparent border-0 position-absolute end-0 top-0"
  type="button"
  onClick={() => setShowOldPassword(!showOldPassword)}
>
  <i className={`fas ${showOldPassword ? "fa-eye-slash" : "fa-eye"} text-light`}></i>
</button> */}
          <PasswordToggle onToggle={setShowOldPassword} />
        </div>
        {errors.oldPassword && (
          <span className="text-danger">{errors.oldPassword.message}</span>
        )}

        <div className="position-relative mt-4">
          <label className="position-absolute start-0 top-0 px-2 color-label">
            New Password
          </label>
          <input
            {...register("newPassword", passwordValidation)}
            type={showNewPassword ? "text" : "password"}
            className="form-control bg-transparent border-0 border-bottom rounded-0 px-2 pt-4 placeholder-custom"
            placeholder="Enter your Password"
          />
          {/* <button
  className="btn bg-transparent border-0 position-absolute end-0 top-0"
  type="button"
  onClick={() => setShowNewPassword(!showNewPassword)}
>
  <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"} text-light`}></i>
</button> */}
          <PasswordToggle onToggle={setShowNewPassword} />
        </div>
        {errors.newPassword && (
          <span className="text-danger">{errors.newPassword.message}</span>
        )}

        <div className="position-relative mt-4 ">
          <label className="position-absolute start-0 top-0 px-2 color-label">
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
          {/* <button
    className="btn bg-transparent border-0 position-absolute end-0 top-0"
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-light`}></i>
  </button> */}
          <PasswordToggle onToggle={setShowConfirmPassword} />
        </div>
        {errors.confirmNewPassword && (
          <span className="text-danger">
            {errors.confirmNewPassword.message}
          </span>
        )}
        <Button isSubmitting={isSubmitting}>save</Button>
      </form>
    </div>
  );
};

export default ChangePassword;
