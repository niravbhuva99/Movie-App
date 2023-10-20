import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import useFetch from "../api/useFetch";
import Cards from "./Cards";

const Recommendations = ({ movieId, cat: term }) => {
  const { data } = useFetch(`/${term}/${movieId}/recommendations`);
  console.log(movieId, term, data);

  return (
    <React.Fragment>
      {data?.results?.length > 0 && (
        <Stack
          direction="column"
          sx={{
            width: {
              sm: "100%",
              md: "100%",
            },
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
              justifyContent: "center",
              flexWrap: "wrap",
              gap: {
                sm: 3,
                lg: 1,
              },
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
