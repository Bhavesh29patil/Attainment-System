// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import styled from "styled-components";

const Navbar = () => {
  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <StyledTypography variant="h6" component={Link} to="/">
          Attainment System
        </StyledTypography>
        <div style={{ marginLeft: "auto" }}>
          <StyledButton color="inherit" component={Link} to="/choose">
            Login
          </StyledButton>
          {/* <StyledButton color="inherit" component={Link} to="/chooseasguest">
            Login as Guest
          </StyledButton> */}
          <StyledButton color="inherit" component={Link} to="/Adminregister">
            Sign up
          </StyledButton>
        </div>
      </StyledToolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #00308f;
    position: sticky;
    top: 0;
  }
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const StyledTypography = styled(Typography)`
  && {
    text-decoration: none;
    color: white;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    color: white;
    &:hover {
      background-color: #555;
    }
  }
`;

export default Navbar;
