import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import InputSearch from "./InputSearch";

const SearchBar = () => {
  return (
    <Box
      sx={{
        zIndex: 20,
        position: "relative",
        top: 0,
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        width: "100%",
        marginBottom: "5rem",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: "3px" }}>
        Welcome
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero numquam
        quia consequuntur odio. Cumque eius excepturi optio quasi natus iusto.
      </Typography>
      <InputSearch width="50%" />
    </Box>
  );
};

export default SearchBar;
