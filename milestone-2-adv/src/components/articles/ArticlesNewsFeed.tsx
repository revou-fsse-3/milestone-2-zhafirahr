import { ReactElement, useContext } from "react";
import SearchContext from "../../contexts/SearchContext";
import ArticlesNewsFeedItem from "./ArticlesNewsFeedItem";
import "../../styling/mainPage.css";
import images from "../../images";
import ArticlesNewsFeedButtons from "./ArticlesNewsFeedButtons";

const ArticlesNewsFeed = (): ReactElement => {
  const { fullArticles, sliceArray } = useContext(SearchContext);

  const articles = fullArticles?.articles
    ? fullArticles.articles.slice(...sliceArray)
    : null;

  const error = fullArticles?.error;

  const renderArticles = (
    <>
      <div>
        {articles?.map((article, i) => {
          const image = images[i];

          return (
            <ArticlesNewsFeedItem key={i} article={article} image={image} />
          );
        })}
      </div>
      <ArticlesNewsFeedButtons />
    </>
  );

  const renderError = (
    <div>
      <h3>There has been an error: {error?.message}</h3>
      <h4>Please search again</h4>
    </div>
  );

  return (
    <div className="newsfeed-div">
      {articles && renderArticles}
      {error && renderError}
    </div>
  );
};

export default ArticlesNewsFeed;
