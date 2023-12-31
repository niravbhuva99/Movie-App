import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SkeletonCom from "./Skeleton";
import React, { useRef, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Cards from "./Cards";
const Carousel = ({ setTerm, data, loading, title, cat2, cat1, term }) => {
  const [active, setActive] = useState({ movie: true, tv: false });
  const CarouselContainer = useRef();
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
        mt: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        height: "480px",
        mb: 1,
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
            style={{ color: active.movie ? "green" : "" }}
          >
            {cat1}
          </Button>
          <Button
            onClick={tvHandle}
            style={{ color: active.tv ? "green" : "" }}
          >
            {cat2}
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          mt: 1,
          width: "70%",
          height: "100%",
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

        {loading ? (
          <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
            {[0, 1, 2, 3, 4, 5].map((item, i) => (
              <SkeletonCom key={i} />
            ))}
          </Box>
        ) : (
          //
          <Stack
            gap={2}
            ref={CarouselContainer}
            overflow="hidden"
            direction="row"
          >
            {data?.results?.map((item, i) => {
              const { backdrop_path, original_title, genre_ids, name, id } =
                item;
              return (
                <Cards
                  obj={{
                    term,
                    backdrop_path,
                    original_title,
                    genre_ids,
                    name,
                    id,
                  }}
                  key={i}
                />
              );
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Carousel;
