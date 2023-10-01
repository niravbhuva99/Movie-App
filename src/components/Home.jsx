import Header from "../header/Header";
import Popular from "./Popular";
import Trending from "./Trending";

const Home = () => {
  return (
    <div>
      <Header />
      <Trending />
      <Popular />
    </div>
  );
};

export default Home;
