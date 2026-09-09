import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="page-status">
    <h1>Page not found</h1>
    <p>The gallery page you requested does not exist.</p>
    <Link to="/">Return to the gallery</Link>
  </main>
);

export default NotFound;
