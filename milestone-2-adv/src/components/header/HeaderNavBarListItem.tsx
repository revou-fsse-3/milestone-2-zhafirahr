import { ReactElement } from "react";
import { HandleSearchType } from "../../api";

type HeaderNavBarListItemPropsType = {
  className: string;
  name: string;
  handleSearch?: HandleSearchType;
  searchTerm?: string;
  icon?: string;
};

const HeaderNavBarListItem = ({
  className,
  name,
  handleSearch,
  searchTerm,
  icon,
}: HeaderNavBarListItemPropsType): ReactElement => {
  const handleClick =
    searchTerm && handleSearch ? () => handleSearch(searchTerm) : () => {};

  return (
    <li onClick={handleClick} className={className}>
      {icon && <i className={icon} />}
      {name}
    </li>
  );
};

export default HeaderNavBarListItem;
