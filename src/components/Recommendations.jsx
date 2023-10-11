import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import useFetch from "../api/useFetch";
import Cards from "./Cards";

const Recommendations = ({ movieId, cat: term }) => {
  const { data } = useFetch(`/${term}/${movieId}/recommendations`);

  return (
    <Stack
      direction="column"
      sx={{
        width: "80%",
        // border: "2px solid grey",
        margin: "auto",
      }}
    >
      <Typography variant="h3" color="whitesmoke" sx={{ letterSpacing: "1px" }}>
        Recommended
      </Typography>
      <Box
        sx={{
          mt: 2,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-around",

          //   border: "2px solid red",
        }}
      >
        {data?.results.map((item) => {
          const { backdrop_path, original_title, genre_ids, name, id } = item;
          return (
            <Cards
              key={id}
              obj={{
                backdrop_path,
                original_title,
                genre_ids,
                height: "200px",
                name,
                id,
                term,
              }}
            />
          );
        })}
      </Box>
    </Stack>
  );
};

export default Recommendations;
