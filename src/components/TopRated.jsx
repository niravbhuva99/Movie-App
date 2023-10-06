import React, { useState } from "react";
import useFetch from "../api/useFetch";
import Carousel from "./Carousel";
const TopRated = () => {
  const [term, setTerm] = useState("movie");
  const { data, loading, error } = useFetch(`/${term}/top_rated`);

  return (
    <Carousel
      data={data}
      loading={loading}
      title="Top-Rated"
      cat1="Movie"
      cat2="Tv- Shows"
      setTerm={setTerm}
      term={term}
    />
  );
};

export default TopRated;
