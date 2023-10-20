import { useDispatch } from "react-redux";
import Header from "../../header/Header";

import { useEffect } from "react";
import { setSearchbar } from "../../Store/HomeSlice";
import Trending from "./Trending";
import Popular from "./Popular";
import TopRated from "./TopRated";
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
