import { RouterProvider } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "../App.css";
import { router } from "./providers/router";
import { theme } from "./styles/theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />;
        </ThemeProvider>
    );
}

export default App;
