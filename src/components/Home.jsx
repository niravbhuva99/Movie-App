import Header from "../header/Header";
import DetailsPage from "./detailspage/DetailsPage";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Trending from "./Trending";

const Home = () => {
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
