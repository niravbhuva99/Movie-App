import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Error from "./pages/Error";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import fetchData from "./api/fetchData";
import { getImageConfig, getGenreList } from "./Store/HomeSlice";
import useFetch from "./api/useFetch";
import Root from "./components/Root";
import DetailsPage from "./components/detailspage/DetailsPage";
import Movie from "./components/Movie";
import Tv from "./components/Tv";

function App() {
  const { data } = useFetch("/genre/tv/list");
  const dispatch = useDispatch();

  useEffect(() => {
    let allGenres = {};
    fetchData("/configuration").then((data) => {
      const base_url = data.images?.base_url + "original";
      dispatch(getImageConfig(base_url));
    });

    dispatch(getGenreList(allGenres));
  }, [dispatch, data]);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/:cat/:movieId",
          element: <DetailsPage />,
        },
        {
          path: "/movie",
          element: <Movie />,
        },
        {
          path: "movie/:cat/:movieId",
          element: <DetailsPage />,
        },
        {
          path: "/tv",
          element: <Tv />,
        },
        {
          path: "tv/:cat/:movieId",
          element: <DetailsPage />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={routes}>
      <div className="App"></div>
    </RouterProvider>
  );
}

export default App;
