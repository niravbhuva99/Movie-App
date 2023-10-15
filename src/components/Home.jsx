import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import DetailsPage from "./detailspage/DetailsPage";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Trending from "./Trending";
import { useEffect } from "react";
import { setSearchbar } from "../Store/HomeSlice";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchbar(false));
  }, []);
  return (
    <div>
      <Header />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
