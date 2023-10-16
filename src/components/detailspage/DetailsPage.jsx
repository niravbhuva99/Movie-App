import React, { useEffect, useState } from "react";
import useFetch from "../../api/useFetch";
import { useParams } from "react-router-dom";
import { CleanHands } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import LazyLoading from "../LazyLoading";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getData, setSearchbar } from "../../Store/HomeSlice";
import Cast from "../Cast";
import Recommendations from "../Recommendations";
const DetailsPage = () => {
  const details = [
    "Type",
    "Country",
    "Genre",
    "Release",
    "Production",
    "overview",
  ];
  // const { genre } = useSelector((state) => state.home);
  const { imgUrl, showSearchbar } = useSelector((state) => state.home);
  const { movieId: movie_id, cat } = useParams();

  const dispatch = useDispatch();
  const { data } = useFetch(
    `/${cat}/${Number(
      movie_id
    )}?api_key=1d4e8eb8c755ca38d2877b38507e36d9&append_to_response=videos,images`
  );

  const title = cat === "tv" ? data?.name : data?.original_title;
  useEffect(() => {
    dispatch(getData(data));
    document.documentElement.scrollTop = 0;
  }, [data, dispatch]);
  useEffect(() => {
    dispatch(setSearchbar(true));
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 0,
        width: "100%",
        mb: 3,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          height: {
            md: "800px",
          },
        }}
        alignItems="center"
      >
        <Box
          sx={{
            height: { md: "800px", width: "100%" },
            opacity: 0.2,
            filter: " blur(10px)",
            objectFit: "fill",
          }}
        >
          <LazyLoading src={imgUrl + data?.images?.posters[0]?.file_path} />
        </Box>
        <Box
          sx={{
            zIndex: 10,
            position: "absolute",
            width: "70%",
            top: "15%",
            // border: "2px solid red",
            display: "flex",
            alignItems: "center",
            height: "80%",
            gap: 5,
          }}
        >
          <Box
            sx={{
              width: "30%",
              height: "80%",
              display: "flex",
              alignItems: "center",
              m: 1,
              // border: "2px solid blue",
              flexDirection: "row",
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
              <LazyLoading
                src={imgUrl + data?.images?.posters[0]?.file_path}
                style={{ height: "100%" }}
              />
            </Paper>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexGrow: 2,
              alignItems: "flex-start",
              height: "70%",
              width: "70%",
              // border: "2px solid red",
              flexDirection: "column",
            }}
          >
            <Box sx={{}}>
              <Typography
                variant="h3"
                color="white"
                sx={{ letterSpacing: "2px" }}
              >
                {title}
              </Typography>
              <Typography variant="h6" color="grey">
                {data?.tagline}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Card
                sx={{
                  MaxWidth: {
                    md: "400px",
                    sm: "100px",
                  },

                  display: "flex",
                  padding: 2,
                  bgcolor: "black",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Avatar>R</Avatar>
                <Rating max={1} value={1} />
                <Typography variant="body" color="whitesmoke">
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                columnGap: 8,
                mt: 3,
                alignItems: "baseline",
              }}
            >
              <Box className="left-container" sx={{ color: "grey.400" }}>
                {details.map((detail, i) => (
                  <Typography variant="h6" key={i}>
                    {detail}:
                  </Typography>
                ))}
              </Box>
              <Box
                className="right-container"
                sx={{
                  color: "whitesmoke",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">
                  {cat.slice(0, 1).toUpperCase() + cat.slice(1).toUpperCase()}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  {data?.production_countries?.map((item, i) => {
                    const comma =
                      data?.production_countries.length - 1 === i ? "" : ",";
                    return (
                      <Typography variant="h6" key={i}>
                        {item.name + comma}
                      </Typography>
                    );
                  })}
                </Box>
                <Box sx={{ display: "flex" }}>
                  {data?.genres?.map((item, i) => {
                    const comma = data?.genres.length - 1 === i ? "" : ",";
                    return (
                      <Typography variant="h6" key={i} sx={{ p: 0 }}>
                        {item.name + comma}
                      </Typography>
                    );
                  })}
                </Box>
                <Typography variant="h6">
                  {dayjs(data?.release_date).format("MMM DD,YY")}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  {data?.production_companies?.map((item, i) => {
                    const comma =
                      data?.production_companies.length - 1 === i ? "" : ",";
                    return (
                      <Typography variant="h6" key={i}>
                        {item.name + comma}{" "}
                      </Typography>
                    );
                  })}
                </Box>
                <Typography variant="subtitle2" color="grey.500">
                  {data?.overview}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
      <Cast movieId={movie_id} cat={cat} />
      <Recommendations movieId={movie_id} cat={cat} />
    </Box>
  );
};

export default DetailsPage;
