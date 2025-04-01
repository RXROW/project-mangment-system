interface ButtonProps {
  children: string;
  isSubmitting: boolean;
}
export default function Button({ children, isSubmitting }: ButtonProps) {
  return (
    <div className="auth-btn rounded-pill  w-100  my-3 ">
      <button
        disabled={isSubmitting}
        type="submit"
        className="btn text-white text-capitalize border-0 fw-semibold fs-5 w-100"
      >
        {isSubmitting && (
          <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>
        )}
        {children}
      </button>
    </div>
  );
}
