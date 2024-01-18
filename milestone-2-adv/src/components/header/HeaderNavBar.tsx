import { useContext, ReactElement } from "react";
import SearchContext from "../../contexts/SearchContext";
import HeaderNavBarListItem from "./HeaderNavBarListItem";

const HeaderNavBar = ({
  handleClick,
}: {
  handleClick: () => void;
}): ReactElement => {
  const { handleSearch } = useContext(SearchContext);

  const listItems = [
    {
      className: "",
      icon: "d-none home icon home-icon",
      name: "Home",
    },
    {
      searchTerm: "data breaches",
      className: "d-breaches",
      name: "Data Breaches",
    },
    {
      searchTerm: "cyber attacks",
      className: "cyber-attacks",
      name: "Cyber Attacks",
    },
    {
      className: "d-none newsletter",
      icon: "envelope icon",
      name: "Newsletter",
    },
    {
      searchTerm: "vulnerabilities",
      className: "vulnerable",
      name: "Vulnerabilities",
    },
    {
      searchTerm: "malware",
      className: "malware",
      name: "Malware",
    },
    {
      className: "",
      icon: "d-none shopping cart icon cart-icon",
      name: "Store",
    },
    {
      className: "contact",
      name: "Contact",
    },
  ];

  return (
    <nav className="container-fluid">
      <div className="menu ps-4">
        <ul className="d-flex align-items-center h-100">
          {listItems.map(({ className, name, icon, searchTerm }) => (
            <HeaderNavBarListItem
              key={name}
              className={className}
              name={name}
              icon={icon}
              searchTerm={searchTerm}
              handleSearch={handleSearch}
            />
          ))}
        </ul>
      </div>
      <div className="icons-menu d-flex align-items-center justify-content-end justify-content-evenly mb-2 pe-5">
        <i onClick={() => handleClick()} className="search icon ps-4"></i>
        <i className="bars icon ps-5"></i>
      </div>
    </nav>
  );
};

export default HeaderNavBar;
