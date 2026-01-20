import { createContext, useContext, useState } from "react";
import { themeState } from "../utils/theme.js";

const ThemeContext = createContext(themeState);

export const ThemeProvider = ({ children }) => {
    const [theme] = useState(themeState)
    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);