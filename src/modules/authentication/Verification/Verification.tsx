import { SubmitHandler, useForm } from "react-hook-form";
import { emailValidation, otpValidation } from "../../../services/validation";
import { publicInstance } from "../../../services/apiConfig";
import { AUTH_URLS } from "../../../services/apiUrls";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VerfiyData } from "../../../interfaces/authInterfaces";
// interface VerifyData {
//   email: string;
//   code: string;
// }
const Verification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerfiyData>({ defaultValues: { email: state?.email || "" } });
  const onSubmit: SubmitHandler<VerfiyData> = async (data) => {
    try {
      await publicInstance.put(AUTH_URLS.VERIFY, data);
      navigate("/login");
      toast.success(" Create Accoount Successlly");
    } catch (error: unknown) {
      toast.error(error.response.data.message || " Error Happen");
    }
  };
  return (
    <div className="p-5 ">
      <div className="mb-5 text-start ">
        <p className="m-0 text-light">Welcome to PMS</p>
        <h2 className="m-0 fs-1 color-label">Verify Account</h2>
        <span className="line"></span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <div className="pb-3">
          <label className="ps-2 color-label">User Name</label>
          <input
            {...register("email", emailValidation)}
            type="text"
            className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
            placeholder="Enter your name"
          />
        </div>
        {errors.email && (
          <span className="text-danger">{String(errors.email.message)}</span>
        )}
        <div className="pb-3">
          <label className="ps-2 color-label">OTP Verification</label>
          <input
            {...register("code", otpValidation)}
            type="text"
            className="form-control bg-transparent border-0 border-bottom rounded-0 px-2  placeholder-custom"
            placeholder="Enter Verification"
          />
        </div>
        {errors.code && (
          <span className="text-danger">{String(errors.code.message)}</span>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="btn auth-btn w-100 rounded-5 text-light submit"
        >
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>
          )}
          Save
        </button>
      </form>
    </div>
  );
};

export default Verification;
