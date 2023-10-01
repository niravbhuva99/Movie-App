import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Error from "./pages/Error";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import fetchData from "./api/fetchData";
import { getImageConfig, getGenreList } from "./Store/HomeSlice";
import useFetch from "./api/useFetch";

function App() {
  const { data } = useFetch("/genre/tv/list");
  const dispatch = useDispatch();

  useEffect(() => {
    let allGenres = {};
    fetchData("/configuration").then((data) => {
      const base_url = data.images?.base_url + "original";
      dispatch(getImageConfig(base_url));
    });
    const genresNames = data?.genres?.map((item) => {
      return (allGenres[item.id] = item);
    });

    dispatch(getGenreList(allGenres));
  }, [dispatch, data]);
  const routes = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: <Error /> },
  ]);
  return (
    <RouterProvider router={routes}>
      <div className="App"></div>
    </RouterProvider>
  );
}

export default App;
