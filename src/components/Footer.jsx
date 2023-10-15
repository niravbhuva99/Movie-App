import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <Divider color="primary" />
      <Box sx={{ m: 3, display: "flex", justifyContent: "center" }}>
        <Typography variant="body2" color="white">
          © 2023 Nirav Bhuva. All rights reserved.
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default Footer;
