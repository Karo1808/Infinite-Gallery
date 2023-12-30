import Gallery from "../components/Gallery";
import { RiInfinityLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header className="header">
        <Link className="logo-container" to="/">
          <RiInfinityLine size={50} />
          <span className="title">Gallery</span>
        </Link>
      </header>
      <main>
        <Gallery />
      </main>
    </>
  );
};

export default Home;