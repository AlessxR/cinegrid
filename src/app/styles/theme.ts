import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#a78bfa",
            dark: "#8b5cf6",
            light: "#c4b5fd",
        },
        background: {
            default: "#101014",
            paper: "#19191f",
        },
        text: {
            primary: "#f5f5f7",
            secondary: "#a1a1ad",
        },
        divider: "#2a2a33",
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
});
