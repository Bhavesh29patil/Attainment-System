import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { AccountCircle, Group } from "@mui/icons-material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";
import Navbar from "./navbar";

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Adminlogin");
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Studentlogin");
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Teacherlogin");
      }
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard");
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <>
      <Navbar />
      <StyledContainer>
        <StyledChooseUserType>Choose User Type</StyledChooseUserType>
        <StyledCardContainer>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard onClick={() => navigateHandler("Admin")}>
                <StyledIcon>
                  <AccountCircle fontSize="large" />
                </StyledIcon>
                <StyledTypography variant="h5">Admin</StyledTypography>
                <StyledText>
                  Login as an Administrator
                </StyledText>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard onClick={() => navigateHandler("Teacher")}>
                <StyledIcon>
                  <Group fontSize="large" />
                </StyledIcon>
                <StyledTypography variant="h5">Teacher</StyledTypography>
                <StyledText>
                  Login as a Teacher 
                </StyledText>
              </StyledCard>
            </Grid>
          </Grid>
        </StyledCardContainer>
        <StyledBackdrop open={loader}>
          <CircularProgress color="inherit" />
          Please Wait
        </StyledBackdrop>
        <Popup
          message={message}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      </StyledContainer>
    </>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  // background-color: #b9d9eb; // Main background color
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const StyledChooseUserType = styled.h1`
  color: #324ab2;
  margin-bottom: 20px;
`;

const StyledCardContainer = styled(Container)`
  z-index: 1;
`;

const StyledCard = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #324ab2 !important;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #00308f !important;
  }
`;

const StyledIcon = styled(Box)`
  color: #fff;
  margin-bottom: 10px;
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;

const StyledText = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledBackdrop = styled(Backdrop)`
  background-color: transparent !important;
`;
