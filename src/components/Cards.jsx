import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LazyLoading from "./LazyLoading";
import { useSelector } from "react-redux";

const Cards = ({
  obj: {
    backdrop_path,
    original_title,
    genre_ids,
    name,
    id,
    term,
    height = "100%",
    original_name,
    minWidth = 235,
  },
}) => {
  const navigate = useNavigate();
  const { imgUrl } = useSelector((state) => state.home);
  const { genres } = useSelector((state) => state.home);
  const image = !backdrop_path
    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZa6iS4YcxZgCHJppoj_CCGT5Ofv_A2qRc_t_gIDOo&s"
    : imgUrl + backdrop_path;
  return (
    <Card
      sx={{
        minWidth,
        height,
        borderRadius: "15px",
        bgcolor: "black",
      }}
    >
      <CardActionArea
        sx={{ height: "100%", display: "relative", width: minWidth }}
        onClick={() => navigate(`/${term}/${id}`)}
      >
        {/* <CardMedia
                component="img"
                height="100%"
                image={imgUrl + backdrop_path}
                alt="green iguana"
                sx={{
                  position: "absolute",
                  top: 0,
                }}
              /> */}
        <LazyLoading src={image} />
        <CardContent sx={{ position: "absolute", bottom: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="whitesmoke"
            sx={{ letterSpacing: "2px" }}
          >
            {original_title || name || original_name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              flexWrap: "wrap",
              gap: 2,

              justifyContent: "space-around",
            }}
          >
            {genre_ids.slice(0, 2).map((genre, i) => {
              if (genres[genre]?.name) {
                return (
                  <Button
                    variant="text"
                    key={i}
                    sx={{
                      bgcolor: "black",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      color: "whitesmoke",
                      "&:hover": {
                        color: "red",
                      },
                    }}
                  >
                    {genres[genre]?.name}
                  </Button>
                );
              }
              return null;
            })}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Cards;
