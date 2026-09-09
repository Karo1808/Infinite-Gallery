import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import styles from "../styles/search.module.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchTerm(searchParams.get("query") ?? "");
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    setSearchParams(query ? { query } : {});
  };

  return (
    <form className={styles.searchbar} onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="photo-search">
        Search photos
      </label>
      <input
        id="photo-search"
        className={styles.search_input}
        type="text"
        placeholder="Search for photos"
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
      />
      <button
        className={styles.search_button}
        type="submit"
        aria-label="Search photos"
      >
        <MdSearch size={27} />
      </button>
    </form>
  );
};

export default Search;
