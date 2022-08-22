import { useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Archive from "./components/Archive";
import Footer from "./components/Footer";
import { Container } from "@mui/system";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
// import ToggleDM from "./components/ToggleDM";

function App() {
  const isDark = useSelector((state) => state.theme);
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${isDark})`);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
