import { Box } from "@mui/material";
import DetailBox from "./DetailBox";
import { useParams } from "react-router-dom";
const details = [
  "Type",
  "Country",
  "Genre",
  "Release",
  "Production",
  "overview",
];
const DetailsInfoBoxes = ({ data }) => {
  const { cat } = useParams();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        columnGap: {
          xs: 2,
          md: 8,
        },
        mt: 3,
        flexDirection: "column",
        alignItems: "baseline",
      }}
    >
      {details.map((detail, index) => (
        <DetailBox key={index} title={detail} data={data} cat={cat} />
      ))}
    </Box>
  );
};

export default DetailsInfoBoxes;
