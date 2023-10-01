import React, { useState } from "react";
import useFetch from "../api/useFetch";
import Carousel from "./Carousel";
const Popular = () => {
  const [term, setTerm] = useState("movie");
  const { data, loading, error } = useFetch(`/${term}/popular`);

  return (
    <Carousel
      data={data}
      loading={loading}
      title="Popular"
      cat1="Movie"
      cat2="Tv- Shows"
      setTerm={setTerm}
    />
  );
};

export default Popular;
