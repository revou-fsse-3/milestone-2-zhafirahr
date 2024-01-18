import { MockedRequest, RestHandler, rest } from "msw";
import { MockResponseType } from "./api";

type NewsFeedHandlersType = (
  mainArticles: MockResponseType,
  trendingArticles: MockResponseType
) => Promise<RestHandler<MockedRequest<MockResponseType>>[]>;

const newsFeedHandlers: NewsFeedHandlersType = async (
  mainArticles,
  trendingArticles
) => {
  let mainStatusCode = mainArticles instanceof Error ? 401 : 200;
  let trendingStatusCode = trendingArticles instanceof Error ? 401 : 200;

  return [
    rest.get(
      "https://newsapi.org/v2/everything",
      async (req, res, ctx) =>
        await res(ctx.status(mainStatusCode), ctx.json(mainArticles))
    ),
    rest.get(
      "https://newsapi.org/v2/top-headlines",
      async (req, res, ctx) =>
        await res(ctx.status(trendingStatusCode), ctx.json(trendingArticles))
    ),
  ];
};

export default newsFeedHandlers;
