import { FormEvent, ReactElement, useContext, useState } from "react";
import SearchContext from "../../contexts/SearchContext";
import "../../styling/header.css";

const HeaderSearchBar = ({ display }: { display: boolean }): ReactElement => {
  const { handleSearch } = useContext(SearchContext);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form
      className={`${
        display ? "form-displayed" : ""
      } d-flex justify-content-center align-items-center`}
      onSubmit={handleFormSubmit}
    >
      <div className={`${display ? "input-group-displayed" : ""} input-group`}>
        <input
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          type="text"
          className={`${display ? "input-displayed" : ""} form-control me-1`}
          placeholder="Search Here..."
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </div>
    </form>
  );
};

export default HeaderSearchBar;
