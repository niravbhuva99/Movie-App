import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../api/useFetch";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import VideoPage from "./VideoPage";
const Cast = ({ movieId, cat }) => {
  const { imgUrl, videoData } = useSelector((state) => state.home);
  const { data } = useFetch(`/${cat}/${movieId}/credits`);
  const [video, setVideos] = useState(null);
  const [url, setUrl] = useState({ show: false, key: "" });
  const carouselContainer = useRef();
  const scrollHandle = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setVideos(videoData);
  }, [videoData]);
  return (
    <Stack
      style={{ filter: url.show ? "blur(5px)" : "blur(0px)" }}
      sx={{ width: "100%", mt: 2 }}
    >
      <Box
        sx={{
          width: "80%",
          margin: {
            md: "2 auto",
            xs: "1 0",
          },
        }}
      >
        <Typography
          variant="h3"
          color="whitesmoke"
          sx={{
            width: "100%",
            margin: {
              md: "0 14px",
              xs: 0,
            },
          }}
        >
          Cast
        </Typography>
      </Box>

      <Box
        sx={{
          width: {
            xs: "100%",
            md: "80%",
          },
          margin: {
            xs: 0,
            md: "0 auto",
          },
          minHeight: "250px",
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          gap: {
            xs: 1,
            md: 2,
          },
          overflow: "hidden",
          padding: {
            xs: 0,
            md: 2,
          },
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-80%)",
            zIndex: 10,
            "& svg": { fontSize: "55px" },
          }}
          color="success"
          disableRipple
          onClick={() => scrollHandle("left")}
        >
          <KeyboardArrowLeftIcon sx={{}} />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-80%)",
            "& svg": { fontSize: "55px" },
            zIndex: 10,
          }}
          onClick={() => scrollHandle("right")}
          color="success"
          disableRipple
        >
          <KeyboardArrowRightIcon sx={{}} />
        </IconButton>
        <Box
          ref={carouselContainer}
          sx={{
            display: "flex",
            gap: 2,
            overflow: "hidden",
            flexDirection: "row",
          }}
        >
          {data?.cast?.map((person, i) => {
            const { profile_path, original_name, character } = person;
            const imageUrl = imgUrl + profile_path;
            return (
              <Card sx={{ minWidth: 155, bgcolor: "black" }} key={i}>
                <CardMedia
                  sx={{ height: 140, objectPosition: "center" }}
                  image={
                    profile_path
                      ? imageUrl
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQagAOppyMeA7F5Dv98mR8mvCbPtCXO5bI_F-Q3aYg21g&s"
                  }
                  title={original_name}
                />

                <CardContent
                  sx={{
                    color: "whitesmoke",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    component="h6"
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {original_name}
                  </Typography>
                  <Typography variant="body" component="p" color="grey">
                    {character}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: {
            xs: "100%",
            md: "100%",
          },
          margin: "auto",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography variant="h4" color="white" m={1}>
          Trailers
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            mt: 3,
            flexDirection: {
              xs: "column",
              md: "row",
            },
            height: {
              md: "300px",
            },
            gap: {
              xs: 2,
              md: 1,
            },
            justifyContent: "space-around",
          }}
        >
          {video?.videos?.results?.map((item, i) => {
            if (i > 3) return "";
            const url = "https://img.youtube.com/vi/";

            return (
              <Card sx={{ minWidth: "315px", height: "200px" }} key={item.key}>
                <CardActionArea
                  sx={{
                    height: "100%",
                  }}
                  onClick={() =>
                    setUrl({
                      show: true,
                      key: item.key,
                    })
                  }
                >
                  <Box
                    sx={{
                      height: "100%",
                      position: "relative",
                      "& img": {
                        height: "100%",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                      }}
                    >
                      <img src={url + item.key + "/mqdefault.jpg"} alt="" />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        "& svg:hover": {
                          color: "red",
                          transform: "scale(1.6)",
                          transition: "transform 0.4s ease",
                        },
                      }}
                    >
                      <PlayCircleIcon fontSize="large" />
                    </Box>
                  </Box>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>

        {url.show && (
          <VideoPage urlKey={url.key} show={url.show} setUrl={setUrl} />
        )}
      </Box>
    </Stack>
  );
};

export default Cast;
