import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box } from "@mui/material";
import styled from "styled-components";
import Students from "../assets/students.svg";
import pictlogo from "../assets/download.png"
import Navbar from "./navbar";
import CustomFooter from "./footer";
import { LightPurpleButton } from "../components/buttonStyles";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  // background-color: #b9d9eb;
  position: relative;
  margin-top: 100px;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100%;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Homepage = () => {
  return (
    <>
      <Navbar />
      <StyledContainer>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <img src={pictlogo} alt="students" style={{ width: "70%" , marginTop: "3%" }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <StyledTitle>
                Welcome to
                <br />
                PICT Attainment
                <br />
                System
              </StyledTitle>
              <StyledText>
                Streamline subject-wise attainment calculations for IT
                department students. Evaluate performance based on unit tests
                and final exams, providing detailed insights into each student's
                academic progress. Access records, view percentage-based
                attainment, and facilitate efficient communication to enhance
                academic management.
              </StyledText>
              <StyledBox>
                <StyledLink to="/choose">
                  {/* <LightPurpleButton variant="contained" fullWidth>
                    Login
                  </LightPurpleButton> */}
                  <LightPurpleButton
                    variant="contained"
                    fullWidth
                    style={{ backgroundColor: "#324AB2" }}
                  >
                    Login
                  </LightPurpleButton>
                </StyledLink>
                <StyledLink to="/chooseasguest">
                  {/* Add your Login as Guest button here */}
                </StyledLink>
                <StyledText>
                  Don't have an account?{" "}
                  <Link to="/Adminregister" style={{ color: "#324AB2" }}>
                    Sign up
                  </Link>
                </StyledText>
              </StyledBox>
            </StyledPaper>
          </Grid>
        </Grid>
      </StyledContainer>
      <CustomFooter />
    </>
  );
};

export default Homepage;
