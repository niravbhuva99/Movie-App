import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import styles from "./Header.module.css";
import { Box, Typography } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import SearchBar from "../components/Searchbar";
const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <Banner />
        <div className={styles.effect}></div>
        <SearchBar />
      </div>
    </React.Fragment>
  );
};

export default Header;
