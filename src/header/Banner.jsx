import { Box } from "@mui/material";
import useFetch from "../api/useFetch";
import style from "./Banner.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LazyLoading from "../components/LazyLoading";
const Banner = () => {
  const dataFromRedux = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  const [imgPath, setImgPath] = useState("");
  useEffect(() => {
    const randomImg =
      dataFromRedux.imgUrl +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setImgPath(randomImg);
  }, [data, dataFromRedux.imgUrl]);
  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: "400px",
          md: "100%",
        },
        position: "absolute",
        top: 0,
      }}
    >
      {!loading && <LazyLoading src={imgPath} width="100%" />}

      <div className={style.overlay}></div>
    </Box>
  );
};

export default Banner;
