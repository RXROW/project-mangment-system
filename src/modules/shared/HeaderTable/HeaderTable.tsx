import { useAuthContext } from "../../../context/AuthContext";
import useThemeContext from "../../../hooks/useThemeContext";

interface HeaderTableProps {
  handleAdd?: () => void;
  header?: string;
  namebtn?: string;
  type?: string;
  goBack?: () => void;
}

const HeaderTable: React.FC<HeaderTableProps> = ({
  handleAdd,
  header,
  namebtn,
  type,
  goBack,
}) => {
  const { loginData } = useAuthContext();
  const { theme } = useThemeContext();
  const isDarkMode = theme === "dark";

  // Styles for update type
  const updateLinkStyle = {
    color: isDarkMode ? "#e0e0e0" : "inherit",
    cursor: "pointer"
  };

  const updateContainerStyle = {
    backgroundColor: isDarkMode ? "#1e1e1e" : "transparent",
    color: isDarkMode ? "#e0e0e0" : "inherit"
  };

  // Styles for standard header
  const headerContainerStyle = {
    backgroundColor: isDarkMode ? "#006948" : "#f5ffeb",
    borderTop: isDarkMode ? "1px solid #2d2d2d" : "1px solid #e5e5e5"
  };

  const headerTextStyle = {
    color: isDarkMode ? "#ffffff" : "#004f1d"
  };

  const buttonStyle = {
    backgroundColor: isDarkMode ? "#004f36" : "#006948",
    color: "#ffffff",
    border: "none",
    display: "flex",
    alignItems: "center",
    borderRadius: "9999px",
    padding: "0.25rem 1rem",
    boxShadow: isDarkMode ? "0 2px 4px rgba(0, 0, 0, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.1)"
  };

  if (type === 'update') {
    return (
      <div
        className="mt-2 d-flex justify-content-between align-items-center p-4 shadow-sm"
        style={updateContainerStyle}
      >
        <div className="ps-2 ps-md-5 py-1 item">
          <div
            role="button"
            onClick={goBack}
            style={updateLinkStyle}
          >
            <i className="fa-solid fa-angle-left pe-2"></i>
            {namebtn}
          </div>
          <h3>{header}</h3>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mt-2 d-flex justify-content-between align-items-center p-4 shadow-sm"
      style={headerContainerStyle}
    >
      <div className="header">
        <h2
          className="m-0 ps-md-5"
          style={headerTextStyle}
        >
          {header}
        </h2>
      </div>

      {loginData?.userGroup === 'Manager' && (
        <div
          className="px-3 py-1 d-flex align-items-center rounded-pill"
          style={buttonStyle}
        >
          <i className="fa-solid fa-plus me-2"></i>
          <button
            className="btn fw-medium border-0 text-light p-0"
            onClick={handleAdd}
            style={{ background: "transparent" }}
          >
            {namebtn}
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderTable;