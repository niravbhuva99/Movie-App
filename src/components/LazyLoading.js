import { Box } from "@mui/material";
import React from "react";
import LazyLoad from "react-lazy-load";
import "./LazyLoading.css";
const LazyLoading = ({ src }) => (
  <Box sx={{ position: "absolute", top: 0, height: "100%" }}>
    <LazyLoad>
      <img src={src} alt="" style={{ height: "100%" }} />
    </LazyLoad>
  </Box>
);

export default LazyLoading;
