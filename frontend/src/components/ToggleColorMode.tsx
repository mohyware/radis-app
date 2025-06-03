import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { palette } from "../constants";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => { },
});

interface ToggleColorModeProps {
    children: React.ReactNode;
}

export default function ToggleColorMode({ children }: ToggleColorModeProps) {
    const [mode, setMode] = React.useState<"light" | "dark">(() => {
        // Check localStorage first
        const savedMode = localStorage.getItem("theme-mode");
        if (savedMode === "light" || savedMode === "dark") {
            return savedMode;
        }
        // Check system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === "light" ? "dark" : "light";
                    localStorage.setItem("theme-mode", newMode);
                    return newMode;
                });
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    ...palette,
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
