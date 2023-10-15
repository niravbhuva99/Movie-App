import React, { useEffect, useRef } from "react";
import useFetch from "../api/useFetch";
import {
  Box,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Pagination,
  Stack,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import Cards from "./Cards";
import { useSelector } from "react-redux";
const Movie = ({ cat = "movie" }) => {
  const [page, setPage] = useState(1);
  const [genrePage, setGenrePage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const { genres } = useSelector((state) => state.home);
  const { tvGenreList } = useSelector((state) => state.home);
  const [open, setOpen] = useState(false);
  const displayGenre = cat === "movie" ? genres : tvGenreList;

  const { data, loading } = useFetch(
    `/${cat}/popular?language=en-US&page=${page}`
  );

  const { data: genreData, loading: genreLoading } = useFetch(
    `/discover/${cat}?&page=${genrePage}&with_genres=${selectedGenre.join(",")}`
  );

  const displayMovies = selectedMovie ? genreData?.results : moviesData;

  const genrePageHandle = (_, value) => {
    setGenrePage(value);
  };

  const handleScroll = () => {
    if (
      !loading &&
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading && data && data.results) {
      setMoviesData((prevData) => [...prevData, ...data?.results]);
    }
  }, [data, loading]);
  const handleGenre = (event) => {
    setSelectedMovie(true);
    const value = event.target.value;
    setSelectedGenre(typeof value === "number" ? value.split(",") : value);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box>
      <Stack
        sx={{
          width: "100vw",
          justifyContent: "space-between",
          color: "whitesmoke",
          p: 2,
        }}
        direction="row"
      >
        <Typography variant="h4" ml={5}>
          Explore Movies
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
          <Box width="250px">
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel
                id="demo-controlled-open-select-label"
                sx={{ color: "whitesmoke" }}
              >
                Select Genres
              </InputLabel>
              <Select
                fullWidth
                label="Select Genres"
                value={selectedGenre}
                onChange={handleGenre}
                multiple
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                sx={{
                  bgcolor: "green",
                  "& .MuiInputBase-root": {
                    color: "whitesmoke",
                  },
                  "& .MuiFormLabel-root": {
                    color: "whitesmoke",
                  },
                }}
                placeholder="Select Genre"
              >
                {Object.keys(displayGenre).map((name) => (
                  <MenuItem key={name} value={displayGenre[name].id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Stack>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {genreLoading ? (
          <Typography variant="h1" color="green">
            Loading ::::
          </Typography>
        ) : displayMovies?.length > 0 ? (
          displayMovies?.map((item, i) => {
            const {
              backdrop_path,
              original_title,
              genre_ids,
              id,
              original_name,
            } = item;
            return (
              <Cards
                key={i}
                obj={{
                  backdrop_path,
                  original_title,
                  original_name,
                  genre_ids,
                  id,
                  title: "movie",
                  height: "400px",
                  term: cat,
                  minWidth: "250px",
                }}
              />
            );
          })
        ) : (
          <Typography variant="h1" color="green">
            404 Not found
          </Typography>
        )}
      </Box>
      {selectedMovie && (
        <Stack
          spacing={2}
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            m: "45px 0",
          }}
        >
          <Typography color="primary">Page: </Typography>
          <Pagination
            sx={{
              "& .MuiButtonBase-root": {
                color: "whitesmoke",
              },
            }}
            color="primary"
            count={genreData?.total_results}
            variant="outlined"
            shape="rounded"
            size="large"
            page={genrePage}
            onChange={genrePageHandle}
          />
        </Stack>
      )}
    </Box>
  );
};

export default Movie;
