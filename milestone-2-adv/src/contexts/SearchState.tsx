import { useState, useEffect, useRef, createContext } from "react";
import { HandleSearchType, mainArticlesSearch, topArticleSearch } from "../api";
import { CancelTokenSource } from "axios";
import { ArticleType } from "../types";

export type HandleButtonPressType = (buttonType: "prev" | "next") => void;

export type ArticlesStateType = {
  articles: ArticleType[] | null;
  error: Error | null;
};

export const SearchState = () => {
  const [fullArticles, setFullArticles] = useState<ArticlesStateType | null>(
    null
  );
  const [topArticles, setTopArticles] = useState<ArticlesStateType | null>(
    null
  );
  const [sliceArray, setSliceArray] = useState<number[]>([0, 10]);
  const [loading, setLoading] = useState<boolean>(true);

  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  const handleSearch: HandleSearchType = async (searchTerm, initialRender) => {
    setLoading(true);

    if (cancelTokenRef.current) cancelTokenRef.current.cancel();

    if (initialRender) {
      await mainArticlesSearch(searchTerm, setFullArticles, cancelTokenRef);
      await topArticleSearch(setTopArticles);
    } else {
      await mainArticlesSearch(searchTerm, setFullArticles, cancelTokenRef);
    }

    setLoading(false);
  };

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (!fullArticles) {
      id = setTimeout(() => {
        handleSearch("cyber attacks", true);
      }, 3500);
    }

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    setSliceArray([0, 10]);
  }, [fullArticles?.articles]);

  const handleButtonPress: HandleButtonPressType = (buttonType) => {
    window.scrollTo({ top: 0 });

    setSliceArray((prev) =>
      prev.map((num) => (buttonType === "prev" ? num - 10 : num + 10))
    );
  };

  return {
    handleButtonPress,
    sliceArray,
    loading,
    setLoading,
    fullArticles,
    setFullArticles,
    topArticles,
    setTopArticles,
    handleSearch,
  };
};

type SearchStateType = ReturnType<typeof SearchState>;

const SearchContext = createContext<SearchStateType>({
  handleButtonPress: () => {},
  sliceArray: [0, 10],
  loading: true,
  setLoading: () => {},
  fullArticles: null,
  setFullArticles: () => {},
  topArticles: null,
  setTopArticles: () => {},
  handleSearch: () => new Promise(() => {}),
});

export default SearchContext;
