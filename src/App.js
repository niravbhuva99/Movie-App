import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Error from "./pages/Error";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import fetchData from "./api/fetchData";
import {
  getImageConfig,
  getGenreList,
  getTvGenreList,
} from "./Store/HomeSlice";
import useFetch from "./api/useFetch";
import Root from "./components/Root";
import DetailsPage from "./components/detailspage/DetailsPage";
import Movie from "./components/Movie";
import Tv from "./components/Tv";

function App() {
  const { data } = useFetch("/genre/tv/list");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData("/configuration").then((data) => {
      const base_url = data.images?.base_url + "original";
      dispatch(getImageConfig(base_url));
    });
    [
      { cat: "movie", fn: getGenreList },
      { cat: "tv", fn: getTvGenreList },
    ].map((item) =>
      fetchData(`/genre/${item.cat}/list`).then((data) => {
        const allData = {};
        data.genres.map((item) => (allData[item.name] = item));
        dispatch(item.fn(allData));
      })
    );
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
          path: "/tv",
          element: <Tv />,
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
