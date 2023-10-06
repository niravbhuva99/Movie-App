import { Box } from "@mui/material";
import React from "react";
import LazyLoad from "react-lazy-load";
import "./LazyLoading.css";
const LazyLoading = ({ src }) => (
  <LazyLoad>
    <img
      src={
        src ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZa6iS4YcxZgCHJppoj_CCGT5Ofv_A2qRc_t_gIDOo&s"
      }
      alt=""
    />
  </LazyLoad>
);

export default LazyLoading;
