import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import styles from "../styles/search.module.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [_, setSearchParams] = useSearchParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ query: searchTerm });
  };

  return (
    <form className={styles.searchbar} onSubmit={handleSubmit}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search for photos"
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
      />
      <button className={styles.search_button} type="submit">
        <MdSearch size={27} />
      </button>
    </form>
  );
};

export default Search;
