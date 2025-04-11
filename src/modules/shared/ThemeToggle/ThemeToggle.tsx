import useThemeContext from "../../../hooks/useThemeContext";
import styles from "./ThemeToggle.module.css"; 
const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button onClick={handleClick} className="btn border-0">
      {theme === "dark" ? (
        <>
          <span className="sr-only">click to active dark mode</span>
          <i className={`fa-solid fa-moon  ${styles["moon"]}`} />
        </>
      ) : (
        <>
          <span className="sr-only">click to active light mode</span>
          <i className={`fa-solid fa-sun  ${styles["sun"]}`} />
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
