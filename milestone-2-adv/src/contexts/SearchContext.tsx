import { ReactNode } from "react";
import SearchContext, { SearchState } from "./SearchState";

export const SearchStore = ({ children }: { children: ReactNode }) => {
  const state = SearchState();

  const fullProviders = { ...state };

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
