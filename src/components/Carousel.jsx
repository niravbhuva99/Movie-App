import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import useFetch from "../api/useFetch";
import { useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LazyLoad from "react-lazy-load";
import LazyLoading from "./LazyLoading";

const Carousel = ({ setTerm, data, loading, title, cat2, cat1 }) => {
  // const { data, loading } = useFetch(`/trending/${term}/day`);
  const { genre: genres } = useSelector((state) => state.home);
  const { imgUrl } = useSelector((state) => state.home);
  const [active, setActive] = useState({ movie: false, tv: false });
  const CarouselContainer = useRef();
  console.log(loading, data);
  const movieHandle = () => {
    setActive((prev) => {
      return {
        movie: !prev.movie,
        tv: false,
      };
    });

    setTerm("movie");
  };
  const tvHandle = () => {
    setActive((prev) => {
      return {
        tv: !prev.tv,
        movie: false,
      };
    });
    setTerm("tv");
  };
  const skeleton = (i) => {
    return (
      <Box
        key={i}
        sx={{
          position: "relative",
          zIndex: 15,
          height: "100%",
        }}
      >
        {/* <Skeleton
          variant="rectangular"
          minWidth="100%"
          height="100%"
          sx={{ bgcolor: "grey.800", position: "absolute", top: 0 }}
        />
        <Skeleton
          sx={{
            bgcolor: "grey.900",
            position: "absolute",
            bottom: 50,
            zIndex: 5,
            width: "100%",
          }}
        />
        <Skeleton
          width="60%"
          sx={{
            bgcolor: "grey.900",
            position: "absolute",
            bottom: 10,
            zIndex: 5,
          }}
        /> */}

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
          height={60}
          sx={{ bgcolor: "grey.700", position: "absolute", bottom: 20 }}
        />
      </Box>
    );
  };
  const leftButtonHandle = (dir) => {
    const container = CarouselContainer.current;
    console.log(CarouselContainer.current.scrollLeft);
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    console.log(scrollAmount + "px");

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <Box
      className="trending"
      sx={{
        mt: 7,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        // justifyContent: "flex-sta",
        alignItems: "center",
        height: "550px",
        // border: "2px solid red",
        mb: 3,
      }}
    >
      <Box
        className="info"
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "70%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" color="whitesmoke">
          {title}
        </Typography>
        <ButtonGroup variant="text" aria-label="outlined primary button group">
          <Button
            onClick={movieHandle}
            style={{ color: active.movie ? "purple" : "" }}
          >
            {cat1}
          </Button>
          <Button
            onClick={tvHandle}
            style={{ color: active.tv ? "purple" : "" }}
          >
            {cat2}
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          mt: 5,
          border: "2px solid red",
          width: "70%",
          height: "70%",
          p: 2,
          overflow: "hidden",
          display: "flex",
          gap: 2,
          position: "relative",
        }}
      >
        <IconButton
          color="primary"
          sx={{
            position: "absolute",
            zIndex: 5,
            top: "40%",
            left: 0,
          }}
          onClick={() => leftButtonHandle("left")}
        >
          <ChevronLeftIcon sx={{ fontSize: "50px" }} />
        </IconButton>
        <IconButton
          color="primary"
          sx={{
            position: "absolute",
            zIndex: 5,
            top: "40%",
            right: 0,
          }}
          onClick={() => leftButtonHandle("right")}
        >
          <ChevronRightIcon sx={{ fontSize: "50px" }} />
        </IconButton>
        {/* <IconButton sx={{ position: "absolute", top: "50%", right: 0 }}>
          <ChevronRightIcon />
        </IconButton> */}
        {loading ? (
          <div>
            {data?.results.map(() => (
              <p>hello</p>
            ))}
          </div>
        ) : (
          <Stack
            direction="row"
            gap={2}
            sx={{ bgcolor: "grey.900" }}
            ref={CarouselContainer}
            overflow="hidden"
          >
            {data?.results.map((item, i) => {
              const { backdrop_path, original_title, genre_ids, name } = item;
              return (
                <Card
                  sx={{
                    minWidth: 253,
                    height: "100%",
                    borderRadius: "15px",
                  }}
                  key={i}
                >
                  <CardActionArea sx={{ height: "100%", display: "relative" }}>
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
                        {genre_ids.map((genre, i) => {
                          const defaultGenre = [
                            "action",
                            "crime",
                            "drama",
                            "mystery",
                          ];
                          if (genres[genre]?.name) {
                            return (
                              <Chip
                                key={i}
                                label={genres[genre]?.name}
                                color="secondary"
                              />
                            );
                          } else {
                            return (
                              <Chip
                                key={i}
                                label={defaultGenre[i]}
                                color="secondary"
                              />
                            );
                          }
                        })}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Carousel;
