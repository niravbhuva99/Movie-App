import React from "react";
import LazyLoad from "react-lazy-load";
import classes from "./LazyLoading.css";
const LazyLoading = ({ src }) => (
  <LazyLoad className={classes.LazyLoad}>
    <img src={src} alt="" />
  </LazyLoad>
);

export default LazyLoading;
