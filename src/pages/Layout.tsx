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
      <footer className="site-footer">
        Photos provided by{" "}
        <a
          href="https://unsplash.com/?utm_source=infinite-gallery&utm_medium=referral"
          target="_blank"
          rel="noreferrer"
        >
          Unsplash
        </a>
      </footer>
    </>
  );
};

export default Layout;
