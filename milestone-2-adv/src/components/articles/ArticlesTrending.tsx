import { ReactElement, useContext } from "react";
import SearchContext from "../../contexts/SearchContext";
import images from "../../images";

const ArticlesTrending = ({ is1000 }: { is1000: boolean }): ReactElement => {
  const { topArticles } = useContext(SearchContext);

  const handleClick = (link: string): void => {
    window.open(link, "_blank");
  };

  const articles = is1000
    ? topArticles?.articles?.slice(0, 4)
    : topArticles?.articles;

  const error = topArticles?.error;

  const renderArticles = (
    <div className="trending-articles">
      {articles?.map((article, i) => {
        const image = images[i];
        return (
          <article
            key={i}
            onClick={() => handleClick(article.url)}
            className="mb-3"
          >
            <img className="top-image me-3" src={image} />
            <div className="top-title">{article.title}</div>
          </article>
        );
      })}
    </div>
  );

  const renderError = (
    <div>
      <h3>There has been an error: {`${error?.name}${error?.message}`}</h3>
      <h4>Please search again</h4>
    </div>
  );

  return (
    <section className="pe-0 d-flex trending-container justify-content-center align-items-center">
      <div className="trending-stories">
        <h2 className="text-start pb-2 pt-sm-0 trending-header">
          Trending News Stories
        </h2>
        {articles && renderArticles}
        {error && renderError}
      </div>
    </section>
  );
};

export default ArticlesTrending;
