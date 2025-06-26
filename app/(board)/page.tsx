import Feed from "../components/Feed";
import Share from "../components/Share";
import StatusBar from "../components/StatusBar";

const Home = async () => {
  return (
    <div>
      <StatusBar />
      <Share />
      <Feed />
    </div>
  );
};

export default Home;
