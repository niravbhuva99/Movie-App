import { Box, Skeleton } from "@mui/material";
import React from "react";

const SkeletonCom = () => {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 15,
        minWidth: "235px",
        display: "flex",
        margin: "3 0",
        flexDirection: "row",
      }}
    >
      <Skeleton
        variant="rectangular"
        width={210}
        height="100%"
        sx={{
          bgcolor: "grey.800",
          borderRadius: "5px",
          position: "absolute",
          top: 0,
        }}
      />

      <Skeleton
        variant="rounded"
        width={210}
        height={30}
        sx={{ bgcolor: "grey.700", position: "absolute", bottom: 0, mb: 3 }}
      />
    </Box>
  );
};

export default SkeletonCom;
