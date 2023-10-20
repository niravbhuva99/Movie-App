import { Box } from "@mui/material";
import PosterSection from "./PosterSection";
import DetailsInfoSection from "./DetailsInfoSection";
import { useSelector } from "react-redux";

const DetailsSection = ({ title, data, cat }) => {
  const { imgUrl } = useSelector((state) => state.home);
  return (
    <Box
      sx={{
        zIndex: 10,
        position: "absolute",
        width: {
          xs: "100%",
          md: "100%",
          lg: "90%",
        },
        top: "15%",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <PosterSection imgUrl={imgUrl} data={data} />

      <DetailsInfoSection title={title} data={data} cat={cat} />
    </Box>
  );
};

export default DetailsSection;
