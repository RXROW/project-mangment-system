import { SubmitHandler, useForm } from "react-hook-form";
import { emailValidation } from "../../../services/validation";
import { publicInstance } from "../../../services/apiConfig";
import { AUTH_URLS } from "../../../services/apiUrls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ForgetPassData } from "../../../interfaces/authInterfaces";
import Button from "../../shared/Button/Button";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPassData>();

  const onSubmit: SubmitHandler<ForgetPassData> = async (data) => {
    try {
      const response = await publicInstance.post(
        AUTH_URLS.FORGET_PASSWORD,
        data
      );
      console.log(response);
      navigate("/reset-password", { state: { email: data.email } });
      toast.success("Check Your Email");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || " failed to forget password"
      );
    }
  };

  return (
    <div className="col-12 auth-bg p-5 ">
      <div className="mb-5 text-start">
        <p className="m-0 text-light">Welcome to PMS</p>
        <h2 className="m-0 fs-1" style={{ color: "rgba(239, 155, 40, 1)" }}>
          Forget Password
        </h2>
        <span className="line"></span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
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
        {errors.email && (
          <span className="text-danger">{String(errors.email.message)}</span>
        )}
        <Button isSubmitting={isSubmitting}>Verify</Button>
      </form>
    </div>
  );
};

export default ForgetPassword;
