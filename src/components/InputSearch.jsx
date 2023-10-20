import {
  Autocomplete,
  Box,
  FormControl,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./InputSearch.module.css";
import useFetch from "../api/useFetch";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const InputSearch = ({ width }) => {
  const { imgUrl } = useSelector((state) => state.home);
  const [term, setTerm] = useState(null);
  const [options, setoptions] = useState([]);
  const navigate = useNavigate();
  const { data } = useFetch(`/search/multi?query==${term}`);
  console.log("data", data);
  // console.log(options);
  useEffect(() => {
    if (data && data.results) {
      const searchOptions = data.results.map((item, i) => {
        return {
          id: i,
          label: item.original_title || item.original_name || item.name,
          data: item,
          backdrop_path: item.backdrop_path ? item.backdrop_path : false,
        };
      });
      setoptions(searchOptions);
    }
  }, [term, data]);
  return (
    <FormControl sx={{ m: 1, width, flexGrow: 2 }} variant="filled">
      <Autocomplete
        freeSolo={false}
        id="free-solo-2-demo"
        disableClearable
        options={options}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            boxShadow: "0px 0px 20px 1px  #3EFF1F",
            border: 0,
            borderRadius: " 0 30px 30px 0",
            borderColor: "white",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "green",
            },
        }}
        getOptionLabel={(option) =>
          option.data.title || option.data.original_title || option.data.name
        }
        onChange={(e, newValue) => {
          navigate(`/${newValue.data.media_type}/${newValue.data.id}`);
        }}
        renderOption={(props, option, state) => {
          if (option.label === "=") return;
          console.log(option.length, option);
          // const isFocused = state.focused;
          return (
            <Box
              component="li"
              {...props}
              key={option.id}
              sx={{
                p: 0,
                bgcolor: "black",
                m: 0,
                transition: "background-color 0.3s",
              }}
            >
              <Box
                sx={{
                  "& > img": {
                    m: "0 3",
                    flexShrink: 0,
                    width: 80,
                    objectFit: "cover",
                  },
                }}
              >
                <img
                  loading="lazy"
                  src={
                    !option.data.backdrop_path
                      ? "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm8lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      : imgUrl + option.data.backdrop_path
                  }
                  alt=""
                />
              </Box>
              <Box className="info" sx={{ p: 0, m: 0 }}>
                <Box sx={{}}>
                  <Typography variant="h6" sx={{ p: 0, m: 0 }} color="grey">
                    {option.data.title ||
                      option.data.original_title ||
                      option.data.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    color: "grey",
                  }}
                >
                  <Typography variant="body" sx={{ pr: 2 }}>
                    {option.data.media_type}
                  </Typography>
                  |
                  <Typography variant="body" sx={{ pr: 2, pl: 1, m: 0 }}>
                    {dayjs(option.data.release_date).format("MMM/YYYY")}
                  </Typography>
                  |
                  <Typography
                    variant="body"
                    sx={{
                      pr: 2,
                      pl: 1,
                      m: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating name="disabled" max={1} value={10} disabled />
                    {option.data.vote_average}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              "& label": {
                color: "whitesmoke",
              },
            }}
            {...params}
            label="Search Movie & TV"
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
