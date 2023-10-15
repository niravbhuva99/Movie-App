import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./InputSearch.module.css";
import useFetch from "../api/useFetch";
import { useSelector } from "react-redux";

const InputSearch = ({ width }) => {
  const { imgUrl } = useSelector((state) => state.home);
  console.log(imgUrl);
  const [term, setTerm] = useState("");
  const [options, setoptions] = useState([]);

  const { data } = useFetch(`/search/movie?query=${term}`);

  console.log(data);
  useEffect(() => {
    if (data && data.results) {
      const searchOptions = data.results.map((item, i) => {
        return {
          id: i,
          label: item.original_title,
          data: item,
          backdrop_path: item.backdrop_path,
        };
      });
      setoptions(searchOptions);
    }
  }, [term, data]);
  return (
    <FormControl sx={{ m: 1, width }} variant="filled">
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={options}
        // sx={{
        //   "& .MuiInputBase-root input": {
        //     bgcolor: "black",
        //   },
        // }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{
              "& > img": {
                mr: 2,
                flexShrink: 0,
                height: 60,
                width: 90,
                objectFit: "cover",
                display: "flex",
                flexDirection: "row",
              },
            }}
            {...props}
          >
            <img loading="lazy" src={imgUrl + option.backdrop_path} alt="" />

            <Box>
              <Typography variant="h4">{option.title}</Typography>
              <small>{option.vote_average}</small>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default InputSearch;
