import Navigation from "../components/Navigation/Navigation";
import ASCII from "../components/ASCII/ASCII";

const Home = () => {
  return (
    <div className="page-wrap">
      <div className="home">
        <Navigation />
        <ASCII />
      </div>
    </div>
  );
};

export default Home;
