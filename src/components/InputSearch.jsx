import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./InputSearch.module.css";
const InputSearch = ({ width }) => {
  return (
    <FormControl sx={{ m: 1, width }} variant="filled">
      <InputLabel htmlFor="" color="secondary">
        Search
      </InputLabel>
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="search " edge="end">
              <SearchIcon color="primary" />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default InputSearch;
