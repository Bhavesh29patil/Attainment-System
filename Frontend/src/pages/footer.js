import React from "react";
import { Container, Grid, Box, Link, Typography, Divider } from "@mui/material";
import {
  Facebook,
  Twitter,
  Google,
  Instagram,
  LinkedIn,
  GitHub,
  Home,
  Mail,
  Phone,
  Print,
} from "@mui/icons-material";

const Footer = ({ style }) => {
  return (
    <Box
      component="footer"
      className="text-center text-lg-start text-white"
      style={{ backgroundColor: "#324AB2", ...style }} // main footer
    >
      {/* Social media section */}
      <Box
        component="section"
        className="d-flex flex-row align-items-center p-4"
        style={{
          // backgroundColor: "#89CFF0", // social media connect
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>Get connected with us on social networks:</Typography>
        </Box>
        <Box className="d-flex mt-3">
          {/* Add your social media links here */}
          {/* Example: */}
          <Link href="#" className="text-white mx-3" style={{ color: "grey" }}>
            <Facebook />
          </Link>
          <Link href="#" className="text-white mx-3" style={{ color: "grey" }}>
            <Twitter />
          </Link>
          <Link href="#" className="text-white mx-3" style={{ color: "grey" }}>
            <Google />
          </Link>
          <Link href="#" className="text-white mx-3" style={{ color: "grey" }}>
            <Instagram />
          </Link>
          <Link href="#" className="text-white mx-3" style={{ color: "grey" }}>
            <LinkedIn />
          </Link>
          <Link href="#" className="text-white mx-3" style={{ color: "grey" }}>
            <GitHub />
          </Link>
        </Box>
      </Box>

      <Box
        className="text-center p-3"
        style={{
          backgroundColor: "#324AB2", // lasst component
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" className="text-white">
          © 2024 Copyright:
        </Typography>
        <Link href="https://teamAttainment.com/" className="text-white">
          PICTAttainmentSystem.com
        </Link>
      </Box>

      {/* Copyright */}
    </Box>
  );
};

export default Footer;
