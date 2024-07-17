// src/components/Navbar.tsx

import React from "react";
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-scroll";



const customTheme = createTheme({
  palette: {
    primary: {
      main: "#aeeca8",
    },
  },
});

const Navbar: React.FC = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <AppBar color="primary" position="static" className="navbar">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="title">
            Dashboard Clima
          </Typography>
          <div className="nav-buttons">
            <Button color="inherit">
              <Link to="indicators" smooth={true} duration={500} className="nav-link">
                Inicio
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="forecasts" smooth={true} duration={500} className="nav-link">
                Pronósticos
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="trends" smooth={true} duration={500} className="nav-link">
                Tendencias
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="detailedForecasts" smooth={true} duration={500} className="nav-link">
                Pronósticos Detallados
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
