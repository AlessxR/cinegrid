import { RouterProvider } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "../App.css";
import { router } from "./providers/router";
import { theme } from "./styles/theme";
import WatchlistProvider from "./providers/watchlist/WatchlistProvider";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <WatchlistProvider>
                <RouterProvider router={router} />
            </WatchlistProvider>
        </ThemeProvider>
    );
}

export default App;
