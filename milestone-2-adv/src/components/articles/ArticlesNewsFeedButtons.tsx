import { ReactElement, useContext } from "react";
import SearchContext from "../../contexts/SearchContext";

const ArticlesNewsFeedButtons = (): ReactElement => {
  const { fullArticles, sliceArray, handleButtonPress } =
    useContext(SearchContext);

  const articles = fullArticles?.articles;

  const handleNextVisibility =
    articles && sliceArray[1] < articles.length ? "visible" : "hidden";

  const handlePrevVisibility = sliceArray[0] === 0 ? "hidden" : "visible";

  return (
    <div className="article-buttons d-flex py-4 justify-content-between w-100">
      <button
        onClick={() => handleButtonPress("prev")}
        style={{ visibility: handlePrevVisibility }}
        className="d-flex align-items-baseline next-button"
      >
        <i className="chevron left icon fw-bold" />
        <span className="px-1">Previous Page</span>
      </button>
      <button
        onClick={() => handleButtonPress("next")}
        style={{
          visibility: handleNextVisibility,
        }}
        className="d-flex align-items-baseline next-button"
      >
        <span className="px-1">Next Page</span>
        <i className="chevron right icon fw-bold" />
      </button>
    </div>
  );
};

export default ArticlesNewsFeedButtons;
