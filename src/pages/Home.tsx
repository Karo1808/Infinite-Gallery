import Gallery from "../components/Gallery";
import { RiInfinityLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Search from "../components/Search";

const Home = () => {
  return (
    <>
      <header className="header">
        <Link className="logo-container" to="/">
          <RiInfinityLine size={35} />
          <span className="title">Gallery</span>
        </Link>
      </header>
      <main className="main">
        <Search />
        <Gallery />
      </main>
    </>
  );
};

export default Home;
