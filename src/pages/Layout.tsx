import { RiInfinityLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="header">
        <Link className="logo-container" to="/">
          <RiInfinityLine size={35} />
          <span className="title">Gallery</span>
        </Link>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
