import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
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
import DetailsPage from "./pages/detailspage/DetailsPage";
import Movie from "./pages/Movie";
import Tv from "./pages/Tv";

function App() {
  const { data } = useFetch("/genre/tv/list");
  const dispatch = useDispatch();
  console.log(process.env.REACT_APP_AUTH);
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
        data.genres?.map((item) => (allData[item.name] = item));
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
        { index: true, element: <Home /> },
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
