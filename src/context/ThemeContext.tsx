import { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};
export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem("theme") as Theme) || "light"
    );
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "theme") {
                setTheme((event.newValue as Theme) || "light");
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
