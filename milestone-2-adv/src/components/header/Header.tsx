import { useState, ReactElement } from "react";
import SearchBar from "./HeaderSearchBar";
import NavBar from "./HeaderNavBar";
import "../../styling/header.css";

const Header = (): ReactElement => {
  const [display, setDisplay] = useState<boolean>(false);

  const handleClick = (): void => {
    setDisplay((prev) => !prev);
  };

  return (
    <header className="container-fluid px-0">
      <div className="top-header d-flex justify-content-center">
        <div className="top-container d-flex align-items-center justify-content-between ms-4">
          <div className="trusted w-25 d-flex justify-content-end">
            <p>#1 Trusted Cybersecurity News Platform</p>
          </div>
          <div className="icon-div d-flex flex-row align-items-center justify-content-evenly me-1">
            <p className="mb-0 pe-4">Followed by 3.45+ million</p>
            <a href="https://twitter.com/thehackersnews" target="_blank">
              <i className="twitter icon pe-5 mb-2"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/thehackernews/"
              target="_blank"
            >
              <i className="linkedin icon pe-5 mb-2"></i>
            </a>
            <a href="https://www.facebook.com/thehackernews" target="_blank">
              <i className="facebook f icon pe-5 mb-2"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="bottom-header px-3">
        <div className="bottom-container row justify-content-around align-content-center">
          <div className="heading-container pt-2 col-12 pb-2 pb-sm-0">
            <h2 className="heading text-start ps-md-3">The Hacker News</h2>
          </div>
          <div className="subscribe-div col-12 col-sm-4 search-div d-flex justify-content-end align-self-center pb-2 pb-sm-0 pe-1">
            <button className="subscribe-button d-flex align-items-center rounded p-2">
              <i className="fs-5 envelope icon"></i>
              Subscribe to Newsletter
            </button>
          </div>
          <div className="header-search d-none align-items-center justify-content-end mb-2">
            <i
            data-testid="search-icon"
              onClick={() => setDisplay((prev) => !prev)}
              className="fs-4 search icon pe-5"
            ></i>
            <i className="fs-4 bars icon ps-2 pe-1"></i>
          </div>
        </div>
      </div>
      <NavBar handleClick={handleClick} />
      <SearchBar display={display} />
    </header>
  );
};

export default Header;
