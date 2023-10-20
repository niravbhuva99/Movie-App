import { Box, Paper } from "@mui/material";
import LazyLoading from "../../components/LazyLoading";
const PosterSection = ({ imgUrl, data }) => (
  <Box
    sx={{
      width: {
        xs: "90%",
        sm: "50%",
        md: "30%",
      },
      height: {
        lg: "80%",
        md: "60%",
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      m: 1,
    }}
  >
    <Paper
      sx={{
        minWidth: "90%",
        backgroundColor: "black",
        height: "100%",
        "& img": {
          borderRadius: "8px",
        },
        borderRadius: "8px",
        filter: "brightness(1.2)",
      }}
      elevation={21}
    >
      <LazyLoading src={imgUrl + data?.images?.posters[0]?.file_path} />
    </Paper>
  </Box>
);

export default PosterSection;
