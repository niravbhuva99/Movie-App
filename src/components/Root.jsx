import React from "react";
import Navbar from "../header/Navbar";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";

const Root = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Navbar />
      <Stack direction="column" width="100vw">
        <Outlet />
      </Stack>
    </Box>
  );
};

export default Root;
