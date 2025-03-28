import { useState } from "react";

interface PasswordToggleProps {
  onToggle: (isVisible: boolean) => void;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({ onToggle }) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
    onToggle(!isVisible);
  };

  return (
    <button
      className="btn bg-transparent border-0 position-absolute end-0 top-50 translate-middle-y"
      type="button"
      onClick={toggleVisibility}
    >
      <i
        className={`fas ${isVisible ? "fa-eye-slash" : "fa-eye"} text-light`}
      ></i>
    </button>
  );
};

export default PasswordToggle;
