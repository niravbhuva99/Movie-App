import React from "react";
import Banner from "./Banner";
import styles from "./Header.module.css";

import SearchBar from "../components/Searchbar";
import { Box } from "@mui/material";
const Header = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          height: {
            xs: "400px",
            md: "700px",
          },
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Banner />
        <div className={styles.effect}></div>
        <SearchBar />
      </Box>
    </React.Fragment>
  );
};

export default Header;
