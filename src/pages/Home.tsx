import { useEffect } from "react";
import Gallery from "../components/Gallery";
import Search from "../components/Search";
import { useIsUserContext } from "../context/is-user-context";

const Home = () => {
  const { setIsUser } = useIsUserContext();
  useEffect(() => {
    setIsUser(false);
  }, []);
  return (
    <>
      <main className="main">
        <Search />
        <Gallery />
      </main>
    </>
  );
};

export default Home;
