import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [_, setSearchParams] = useSearchParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ query: searchTerm });
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
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
