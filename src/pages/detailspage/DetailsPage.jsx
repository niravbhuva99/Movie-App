import React, { useEffect } from "react";
import useFetch from "../../api/useFetch";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import LazyLoading from "../../components/LazyLoading";
import { useSelector, useDispatch } from "react-redux";
import { getData, setSearchbar } from "../../Store/HomeSlice";
import Cast from "../../components/Cast";
import Recommendations from "../../components/Recommendations";
import DetailsSection from "./DetailsSection";

const DetailsPage = () => {
  const { imgUrl } = useSelector((state) => state.home);
  const { movieId: movie_id, cat } = useParams();
  const dispatch = useDispatch();

  const { data } = useFetch(
    `/${cat}/${Number(
      movie_id
    )}?api_key=1d4e8eb8c755ca38d2877b38507e36d9&append_to_response=videos,images`
  );

  const title = cat === "tv" ? data?.name : data?.original_title;

  useEffect(() => {
    dispatch(getData(data));
    document.documentElement.scrollTop = 0;
    dispatch(setSearchbar(true));
  }, [data, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 0,
        width: "100%",
        mb: 3,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          height: {
            lg: "800px",
            md: "600px",
            xs: "100vh",
          },
          overflowY: {
            md: "hidden",
            xs: "scroll",
          },
        }}
        alignItems="center"
      >
        {/* Background Image */}
        <Box
          sx={{
            width: "100%",
            height: {
              lg: "800px",
              md: "600px",
              xs: "400px",
            },
            opacity: 0.2,
            filter: "blur(10px)",
            objectFit: "fill",
          }}
        >
          <LazyLoading src={imgUrl + data?.images?.posters[0]?.file_path} />
        </Box>

        {/* Details Section */}
        <DetailsSection title={title} data={data} cat={cat} />
      </Stack>

      {/* Cast and Recommendations */}
      <Cast movieId={movie_id} cat={cat} />
      <Recommendations movieId={movie_id} cat={cat} />
    </Box>
  );
};

// const DetailsSection = ({ title, data, cat }) => (
//   <Box
//     sx={{
//       zIndex: 10,
//       position: "absolute",
//       width: {
//         xs: "100%",
//         md: "100%",
//         lg: "90%",
//       },
//       top: "15%",
//       display: "flex",
//       flexDirection: {
//         xs: "column",
//         md: "row",
//       },
//     }}
//   >
//     <PosterSection imgUrl={imgUrl} data={data} />

//     <DetailsInfoSection title={title} data={data} cat={cat} />
//   </Box>
// );

// const PosterSection = ({ imgUrl, data }) => (
//   <Box
//     sx={{
//       width: {
//         xs: "90%",
//         sm: "50%",
//         md: "30%",
//       },
//       border: "2px solid green",
//       height: {
//         lg: "80%",
//         md: "60%",
//       },
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       m: 1,
//     }}
//   >
//     <Paper
//       sx={{
//         minWidth: "90%",
//         backgroundColor: "black",
//         height: "100%",
//         "& img": {
//           borderRadius: "8px",
//         },
//         borderRadius: "8px",
//         filter: "brightness(1.2)",
//       }}
//       elevation={21}
//     >
//       <LazyLoading src={imgUrl + data?.images?.posters[0]?.file_path} />
//     </Paper>
//   </Box>
// );

// const DetailsInfoSection = ({ title, data, cat }) => (
//   <Box
//     sx={{
//       display: "flex",
//       flexGrow: 2,
//       alignItems: "flex-start",
//       height: "70%",
//       width: {
//         xs: "100%",
//         sm: "50%",
//         md: "30%",
//       },
//       flexDirection: "column",
//       alignItems: "center",
//     }}
//   >
//     <Box
//       sx={{
//         display: "flex",
//         width: "100%",
//         height: "150px",
//         flexDirection: {
//           md: "row",
//           xs: "column",
//         },
//         justifyContent: {
//           md: "space-around",
//         },
//         alignItems: {
//           md: "center",
//         },
//       }}
//     >
//       <Box m={2}>
//         <Typography
//           color="white"
//           sx={{
//             letterSpacing: "2px",
//             typography: {
//               xs: "h6",
//               md: "h3",
//             },
//           }}
//         >
//           {title}
//         </Typography>
//         <Typography variant="h6" color="grey">
//           {data?.tagline}
//         </Typography>
//       </Box>
//       <Box sx={{ m: "2 0" }}>
//         <Card
//           sx={{
//             MaxWidth: {
//               md: "400px",
//               xs: "200px",
//             },
//             display: "flex",
//             padding: {
//               md: 2,
//               xs: 1,
//             },
//             alignItems: "center",
//             bgcolor: "black",
//           }}
//         >
//           <Avatar p={1}>R</Avatar>
//           <Rating max={1} value={1} />
//           <Typography variant="body" color="whitesmoke" m={1}>
//             | {data?.runtime} min
//           </Typography>

//           <Rating
//             precision={0.5}
//             readOnly
//             name="simple-controlled"
//             value={data?.vote_average / 2}
//           />
//           <Typography component="legend" color="whitesmoke">
//             {Number(data?.vote_average).toFixed(2)} of 10
//           </Typography>
//         </Card>
//       </Box>
//     </Box>
//     <DetailsInfoBoxes data={data} />
//   </Box>
// );

// const DetailsInfoBoxes = ({ data }) => (
//   <Box
//     sx={{
//       width: "100%",
//       display: "flex",
//       columnGap: {
//         xs: 2,
//         md: 8,
//       },
//       mt: 3,
//       alignItems: "baseline",
//     }}
//   >
//     {details.map((detail, index) => (
//       <DetailBox key={index} title={detail} data={data} cat={cat} />
//     ))}
//   </Box>
// );

// const DetailBox = ({ title, data, cat }) => {
//   const detailData = {
//     Type: cat.slice(0, 1).toUpperCase() + cat.slice(1).toUpperCase(),
//     Country: data?.production_countries,
//     Genre: data?.genres,
//     Release: dayjs(data?.release_date).format("MMM DD,YY"),
//     Production: data?.production_companies,
//     overview: data?.overview,
//   };

//   return (
//     <Box
//       className="right-container"
//       sx={{
//         color: "whitesmoke",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-start",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           width: "100%",
//           alignItems: "baseline",
//         }}
//       >
//         <Typography
//           sx={{
//             width: "120px",
//             typography: {
//               xs: "body1",
//               md: "h6",
//             },
//           }}
//         >
//           {title}:
//         </Typography>
//         <Typography
//           sx={{
//             typography: {
//               xs: "body1",
//               md: "h6",
//             },
//           }}
//         >
//           {Array.isArray(detailData[title])
//             ? detailData[title].map((item) => item.name).join(", ")
//             : detailData[title]}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

export default DetailsPage;
