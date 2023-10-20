import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const DetailBox = ({ title, data, cat }) => {
  const detailData = {
    Type: cat.slice(0, 1).toUpperCase() + cat.slice(1).toUpperCase(),
    Country: data?.production_countries,
    Genre: data?.genres,
    Release: dayjs(data?.release_date).format("MMM DD,YY"),
    Production: data?.production_companies,
    overview: data?.overview,
  };

  return (
    <Box
      className="right-container"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          color: "whitesmoke",

          display: "flex",
          width: "100%",
          alignItems: "baseline",
        }}
      >
        <Typography
          sx={{
            width: "120px",
            typography: {
              xs: "body1",
              md: "h6",
            },
          }}
        >
          {title.at(0).toUpperCase() + title.slice(1)}:
        </Typography>
        <Typography
          sx={{
            typography: {
              xs: "body1",
              md: "h6",
            },
          }}
        >
          {Array.isArray(detailData[title])
            ? detailData[title].map((item) => item.name).join(", ")
            : detailData[title]}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailBox;
