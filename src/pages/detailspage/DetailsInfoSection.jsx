import { Avatar, Box, Card, Rating, Typography } from "@mui/material";
import DetailsInfoBoxes from "./DetailsInfoBoxes";

const DetailsInfoSection = ({ title, data, cat }) => (
  <Box
    sx={{
      display: "flex",
      flexGrow: 2,
      height: "70%",
      width: {
        xs: "100%",
        sm: "50%",
        md: "30%",
      },
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "150px",
        flexDirection: {
          md: "row",
          xs: "column",
        },
        justifyContent: {
          md: "space-around",
        },
        alignItems: {
          md: "center",
        },
      }}
    >
      <Box m={2}>
        <Typography
          color="white"
          sx={{
            letterSpacing: "2px",
            typography: {
              xs: "h6",
              md: "h3",
            },
          }}
        >
          {title}
        </Typography>
        <Typography variant="h6" color="grey">
          {data?.tagline}
        </Typography>
      </Box>
      <Box sx={{ m: "2 0" }}>
        <Card
          sx={{
            MaxWidth: {
              md: "400px",
              xs: "200px",
            },
            display: "flex",
            padding: {
              md: 2,
              xs: 1,
            },
            alignItems: "center",
            bgcolor: "black",
          }}
        >
          <Avatar p={1}>R</Avatar>
          <Rating max={1} value={1} />
          <Typography variant="body" color="whitesmoke" m={1}>
            | {data?.runtime} min
          </Typography>

          <Rating
            precision={0.5}
            readOnly
            name="simple-controlled"
            value={data?.vote_average / 2}
          />
          <Typography component="legend" color="whitesmoke">
            {Number(data?.vote_average).toFixed(2)} of 10
          </Typography>
        </Card>
      </Box>
    </Box>
    <DetailsInfoBoxes data={data} />
  </Box>
);

export default DetailsInfoSection;
