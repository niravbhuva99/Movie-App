import React, { useState } from "react";
import useFetch from "../../api/useFetch";
import Carousel from "../../components/Carousel";

const Trending = () => {
  const [term, setTerm] = useState("movie");

  const { data, loading } = useFetch(`/trending/${term}/day`);

  return (
    <Carousel
      data={data}
      loading={loading}
      setTerm={setTerm}
      title="Trending"
      cat1="Movie"
      cat2="Tv- Shows"
      term={term}
    />
  );
};

export default Trending;
