import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useFetch from "../api/useFetch";
import Cards from "./Cards";

const Recommendations = ({ movieId, cat: term }) => {
  const { data } = useFetch(`/${term}/${movieId}/recommendations`);
  console.log(movieId, term, data);

  // const InfinityScrollHandle = () => {
  //   console.log("scrollHeight", document.documentElement.scrollHeight);
  //   console.log("inderHeight", window.innerHeight);
  //   console.log("scrollTop", document.documentElement.scrollTop);
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", InfinityScrollHandle);
  // });
  return (
    <React.Fragment>
      {data?.results?.length > 0 && (
        <Stack
          direction="column"
          sx={{
            width: "80%",
            // border: "2px solid grey",
            margin: "auto",
          }}
        >
          <Typography
            variant="h3"
            color="whitesmoke"
            sx={{ letterSpacing: "1px" }}
          >
            Recommended
          </Typography>
          <Box
            sx={{
              mt: 2,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {data?.results.map((item) => {
              const { backdrop_path, original_title, genre_ids, name, id } =
                item;
              return (
                <Cards
                  key={id}
                  obj={{
                    backdrop_path,
                    original_title,
                    genre_ids,
                    height: "150px",
                    minWidth: "280px",
                    name,
                    id,
                    term,
                  }}
                />
              );
            })}
          </Box>
        </Stack>
      )}
    </React.Fragment>
  );
};

export default Recommendations;
