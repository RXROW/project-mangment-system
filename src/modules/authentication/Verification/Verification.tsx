import { SubmitHandler, useForm } from "react-hook-form";
import { emailValidation, otpValidation } from "../../../services/validation";
import { publicInstance } from "../../../services/apiConfig";
import { AUTH_URLS } from "../../../services/apiUrls";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VerfiyData } from "../../../interfaces/authInterfaces";
import Button from "../../shared/Button/Button";
import TitleAuth from "../../shared/TitleAuth/TitleAuth";
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
      toast.success(" Create Account Successfully");
    } catch (error: unknown) {
      toast.error(error.response.data.message || " Error Happen");
    }
  };
  return (
    <div className="p-5 col-12 ">
      <TitleAuth name="Verify Account" />
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button isSubmitting={isSubmitting}>save</Button>
      </form>
    </div>
  );
};

export default Verification;
