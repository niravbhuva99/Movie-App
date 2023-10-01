import React, { useState } from "react";
import useFetch from "../api/useFetch";
import Carousel from "./Carousel";
import { DataArray } from "@mui/icons-material";
const Trending = () => {
  const [term, setTerm] = useState("movie");

  const { data, loading, error } = useFetch(`/trending/${term}/day`);

  return (
    <Carousel
      data={data}
      loading={loading}
      setTerm={setTerm}
      title="Trending"
      cat1="Movie"
      cat2="Tv- Shows"
    />
  );
};

export default Trending;
