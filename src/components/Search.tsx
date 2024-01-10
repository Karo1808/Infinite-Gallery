import { useState } from "react";
import { MdSearch } from "react-icons/md";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form className="searchbar">
      <input
        className="search-input"
        type="text"
        placeholder="Search for photos"
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
      />
      <button className="search-button" type="submit">
        <MdSearch size={27} />
      </button>
    </form>
  );
};

export default Search;
