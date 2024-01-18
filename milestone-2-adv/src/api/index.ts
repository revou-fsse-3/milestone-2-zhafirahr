import { MutableRefObject } from "react";
import axios, { CancelTokenSource } from "axios";
import { ArticlesStateType } from "../contexts/SearchState";

export type HandleSearchType = (
  searchTerm: string,
  initialRender?: boolean
) => Promise<void>;

type MainArticlesSearchType = (
  searchTerm: string,
  setArticles: React.Dispatch<React.SetStateAction<ArticlesStateType | null>>,
  cancelToken: MutableRefObject<CancelTokenSource | null>
) => Promise<void>;

type TopArticlesSearchType = (
  setTopArticles: React.Dispatch<React.SetStateAction<ArticlesStateType | null>>
) => Promise<void>;

const axiosSearchApi = axios.create({
  baseURL: "https://newsapi.org/v2/everything",
  params: {
    pageSize: 40,
    sortBy: "publishedAt",
    language: "en",
  },
  headers: {
    Authorization: process.env.REACT_APP_ID as string,
  },
});

const axiosTopHeadlines = axios.create({
  baseURL: "https://newsapi.org/v2/top-headlines",
  params: {
    category: "technology",
    country: "us",
    pageSize: 10,
  },
  headers: {
    Authorization: process.env.REACT_APP_ID as string,
  },
});

export const mainArticlesSearch: MainArticlesSearchType = async (
  searchTerm,
  setArticles,
  cancelToken
) => {
  cancelToken.current = axios.CancelToken.source();

  try {
    const { data } = await axiosSearchApi.get("", {
      cancelToken: cancelToken.current.token,
      params: { q: searchTerm },
    });

    setArticles({ articles: data.articles, error: null });
  } catch (err) {
    if (axios.isCancel(err)) console.error("Cancelled request", err);

    if (!axios.isCancel(err) && err instanceof Error) {
      setArticles({ articles: null, error: err });
      console.error(err.message);
    }
  } finally {
    cancelToken.current = null;
  }
};

export const topArticleSearch: TopArticlesSearchType = async (
  setTopArticles
) => {
  try {
    const { data } = await axiosTopHeadlines.get("");
    setTopArticles({ articles: data.articles, error: null });
  } catch (err) {
    if (err instanceof Error) {
      setTopArticles({ articles: null, error: err });
      console.error(err.message);
    }
  }
};
