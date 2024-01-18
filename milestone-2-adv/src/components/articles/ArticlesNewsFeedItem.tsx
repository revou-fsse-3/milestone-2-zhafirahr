import { ReactElement } from "react";
import format from "date-fns/format";
import { ArticleType } from "../../types";

const ArticleNewsFeedItem = ({
  article,
  image,
}: {
  article: ArticleType;
  image: string;
}): ReactElement => {
  return (
    <article
      className="article-grid mb-4 d-grid"
      onClick={() => window.open(article.url, "_blank")}
      key={article.url}
    >
      <img src={image} className="news-image" />
      <div className="article-info d-grid">
        <h2>{article.title}</h2>
        <aside>
          <div className="d-flex aside-heading">
            <div className="d-flex me-4">
              <i className="calendar alternate outline icon calender-i"></i>
              <h3>
                {format(new Date(article.publishedAt.slice(0, 10)), "PPP")}
              </h3>
            </div>
            <h3>{article.source.Name}</h3>
          </div>
          <div className="aside-content mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </aside>
      </div>
    </article>
  );
};

export default ArticleNewsFeedItem;
