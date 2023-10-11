import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
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
  },
}) => {
  const navigate = useNavigate();
  const { imgUrl } = useSelector((state) => state.home);
  const { genre: genres } = useSelector((state) => state.home);
  console.log(term);
  return (
    <Card
      sx={{
        minWidth: "253px",
        height,
        borderRadius: "15px",
      }}
    >
      <CardActionArea
        sx={{ height: "100%", display: "relative" }}
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
        <LazyLoading src={imgUrl + backdrop_path} />
        <CardContent sx={{ position: "absolute", bottom: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="whitesmoke"
            sx={{ letterSpacing: "2px" }}
          >
            {original_title || name}
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
              const defaultGenre = ["action", "crime", "drama", "mystery"];
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
              // else {
              //   return (
              //     <Button key={i} label={defaultGenre[i]} color="secondary">
              //       action
              //     </Button>
              //   );
              // }
            })}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Cards;
