import React, { useEffect } from "react";
import useFetch from "../api/useFetch";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Cards from "./Cards";
const Movie = ({ cat = "movie" }) => {
  console.log(cat);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetch(
    `/${cat}/popular?language=en-US&page=${page}`
  );
  const [moviesData, setMoviesData] = useState([]);
  console.log(data);
  const handleScroll = () => {
    if (
      !isLoading &&
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
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && data && data.results) {
      setMoviesData((prevData) => [...prevData, ...data.results]);
    }
  }, [data, isLoading]);

  const [age, setAge] = useState("");

  const handleGenre = (event) => {
    setAge(event.target.value);
  };
  const [sort, setsort] = useState("");

  const handleSorting = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box sx={{}}>
      <Stack
        sx={{
          width: "100vw",
          justifyContent: "space-between",
          color: "whitesmoke",
        }}
        direction="row"
      >
        <Typography variant="h4" ml={5}>
          Explore Movies
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 220, bgcolor: "grey", color: "whitesmoke" }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ color: "whitesmoke" }}
              >
                Select Genre
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleGenre}
                label="Selec Genre"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginRight: 3 }}>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 220, bgcolor: "grey", color: "whitesmoke" }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ color: "whitesmoke" }}
              >
                Sort By
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleSorting}
                label="Selec Genre"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
        {
          // backdrop_path,
          // original_title,
          // genre_ids,
          // name,
          // id,
          // term,
          // height = "100%",
          moviesData.map((item, i) => {
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
        }
      </Box>
    </Box>
  );
};

export default Movie;
