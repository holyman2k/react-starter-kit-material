import NavBar from "./NavBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Busy from "./Busy";

const Layout = ({ children }) => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />
            <Container maxWidth="md">
                <div>{children}</div>
            </Container>
            <Busy />
        </ThemeProvider>
    );
};

export default Layout;
