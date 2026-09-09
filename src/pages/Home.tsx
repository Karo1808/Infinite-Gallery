import Gallery from "../components/Gallery";
import Search from "../components/Search";

const Home = () => {
  return (
    <main className="main">
      <h1 className="sr-only">Infinite Gallery</h1>
      <Search />
      <Gallery />
    </main>
  );
};

export default Home;
