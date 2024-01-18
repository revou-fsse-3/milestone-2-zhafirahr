import { ReactNode } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { waitFor, Matcher, MatcherOptions, act } from "@testing-library/react";
import server from "../../mocks/server";
import { customRender, Store } from "../../test-utils/test-utils";
import { SearchStore } from "../../contexts/SearchContext";
import "intersection-observer";
import App from "../App";
import newsFeedHandlers from "../../mocks/handlers";
import {
  MockResponseType,
  lessThan10MainArticles,
  moreThan10MainArticles,
  newSearchedArticles,
  trendingArticlesMock,
} from "../../mocks/api";
import ArticlesNewsFeed from "../articles/ArticlesNewsFeed";

export type WelcomeAnimationIsDoneType = (
  query: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement | null
) => Promise<void>;

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <Store store={SearchStore}>{children}</Store>;
};

const welcomeAnimationIsDone: WelcomeAnimationIsDoneType = async (query) => {
  await waitFor(() => expect(query("placeholder")).toBeNull(), {
    timeout: 4000,
  });
};

const user = userEvent.setup();

describe("Tests with only the default loaded state (no additional searches/API requests)", () => {
  let windowOpen: jest.SpyInstance;

  beforeEach(async () => {
    windowOpen = jest.spyOn(window, "open");

    const handler = await newsFeedHandlers(
      lessThan10MainArticles,
      trendingArticlesMock
    );

    server.use(...handler);
  });

  it("Welcome page is shown and removed from the page after 3.5 seconds and the articles, call to action and footer are on the page", async () => {
    const { getAllByRole, getAllByText, queryByTestId, getByText } =
      customRender(Wrapper, <App />);

    const welcomePageElements = getAllByRole("heading", {
      name: "Hacker News",
    }) as HTMLHeadingElement[];

    welcomePageElements.forEach((ele: HTMLHeadingElement) =>
      expect(ele).toBeInTheDocument()
    );

    await waitFor(() => expect(queryByTestId("placeholder")).toBeNull(), {
      timeout: 4000,
    });

    await waitFor(() => {
      expect(getAllByText("Page 1 Main Articles")[0]).toBeInTheDocument();
      welcomePageElements.forEach((ele: HTMLHeadingElement) =>
        expect(ele).not.toBeInTheDocument()
      );
    });

    expect(getByText("Join 100,000+ Professionals")).toBeInTheDocument();

    expect(getByText("Connect with us!")).toBeInTheDocument();
  });

  it("Network request is made, there are only 9 articles which means there are no buttons to change the pages", async () => {
    const { queryByText, getAllByText, queryByTestId } = customRender(
      Wrapper,
      <App />
    );

    await welcomeAnimationIsDone(queryByTestId);

    expect(getAllByText("Page 1 Main Articles")).toHaveLength(9);

    expect(queryByText("Next Page")).not.toBeVisible();
    expect(queryByText("Previous Page")).not.toBeVisible();
  });

  it("Top newsfeed articles are visible as always", async () => {
    const { getAllByText, queryByTestId } = customRender(Wrapper, <App />);

    await welcomeAnimationIsDone(queryByTestId);

    expect(getAllByText("Trending Articles")[0]).toBeInTheDocument();
  });

  it("When page width is less than 1000px Trending Articles articles should go from 10 length to 4 length (anything after element 4 is undefined)", async () => {
    const { getAllByText, queryByTestId, queryAllByText } = customRender(
      Wrapper,
      <App />
    );

    await welcomeAnimationIsDone(queryByTestId);

    expect(getAllByText("Trending Articles")).toHaveLength(10);

    expect(global.window.innerWidth).toBe(1024);

    act(() => {
      global.window.innerWidth = 950;
      window.dispatchEvent(new Event("resize"));
    });

    expect(global.window.innerWidth).toBe(950);

    expect(queryAllByText("Trending Articles")[4]).toBeUndefined();
  });

  it("Clicking on either type of article will open the article in a new tab", async () => {
    const { getAllByText, queryByTestId } = customRender(Wrapper, <App />);

    await welcomeAnimationIsDone(queryByTestId);

    await user.click(getAllByText("Page 1 Main Articles")[0]);

    expect(windowOpen).toHaveBeenCalledWith(
      "https://stackoverflow.com",
      "_blank"
    );

    await user.click(getAllByText("Trending Articles")[0]);

    expect(windowOpen).toHaveBeenCalledWith(
      "https://stackoverflow.com/trending",
      "_blank"
    );
  });

  it("Call to action input can receive text", async () => {
    const { queryByTestId, getByPlaceholderText } = customRender(
      Wrapper,
      <App />
    );

    await welcomeAnimationIsDone(queryByTestId);

    const callToActionInput = getByPlaceholderText("Your e-mail address");

    await user.type(callToActionInput, "Hello");

    expect(callToActionInput).toHaveValue("Hello");
  });
});

describe("Using search input and navbar buttons to execute searches for fulfilled requests", () => {
  beforeEach(async () => {
    const handler = await newsFeedHandlers(
      lessThan10MainArticles,
      trendingArticlesMock
    );

    server.use(...handler);
  });

  it("Using a navbar search button to execute a new search and receive a fulfilled and failed requests to see they all work", async () => {
    const { queryByTestId, getByText, getAllByText, findAllByText } =
      customRender(Wrapper, <App />);

    await welcomeAnimationIsDone(queryByTestId);

    expect(getAllByText("Page 1 Main Articles")[0]).toBeInTheDocument();

    const handlers = await newsFeedHandlers(
      newSearchedArticles,
      trendingArticlesMock
    );

    server.use(...handlers);

    await user.click(getByText("Malware"));

    const newArticles = await findAllByText("New Searched Articles");

    expect(newArticles[0]).toBeInTheDocument();
  });

  it("Using search input to manually search for articles fulfilled request", async () => {
    const {
      queryByTestId,
      getAllByText,
      getByPlaceholderText,
      getByTestId,
      findAllByText,
    } = customRender(Wrapper, <App />);

    await welcomeAnimationIsDone(queryByTestId);

    expect(getAllByText("Page 1 Main Articles")[0]).toBeInTheDocument();

    const handlers = await newsFeedHandlers(
      newSearchedArticles,
      trendingArticlesMock
    );

    server.use(...handlers);

    const searchInput = getByPlaceholderText("Search Here...");

    await user.click(getByTestId("search-icon"));

    await user.type(searchInput, "virus");

    expect(searchInput).toHaveValue("virus");

    await user.keyboard("{Enter}");

    const newArticles = await findAllByText("New Searched Articles");

    expect(newArticles[0]).toBeInTheDocument();
  });

  it("Using a navbar search button to execute a new search and receive a failed request", async () => {
    const { queryByTestId, getByText, getAllByText, findByText } = customRender(
      Wrapper,
      <App />
    );

    await welcomeAnimationIsDone(queryByTestId);

    expect(getAllByText("Page 1 Main Articles")[0]).toBeInTheDocument();

    const handlers = await newsFeedHandlers(new Error(), trendingArticlesMock);

    server.use(...handlers);

    await user.click(getByText("Malware"));

    expect(
      await findByText(
        "There has been an error: Request failed with status code 401"
      )
    ).toBeInTheDocument();
  });
});

describe("Loaded in with more than ten articles", () => {
  beforeEach(async () => {
    const handler = await newsFeedHandlers(
      moreThan10MainArticles,
      trendingArticlesMock
    );

    server.use(...handler);
  });

  it("Next button is visible and works when more than ten articles, previous button also works", async () => {
    const { queryByTestId, getByText, getAllByText, findByText, queryByText } =
      customRender(Wrapper, <App />);

    window.scrollTo = jest.fn();

    await welcomeAnimationIsDone(queryByTestId);

    expect(getAllByText("Page 1 Main Articles")[0]).toBeInTheDocument();

    expect(queryByText("Previous Page")).not.toBeVisible();

    expect(getByText("Next Page")).toBeVisible();

    await user.click(getByText("Next Page"));

    expect(getAllByText("Page 2 Main Articles")[0]).toBeInTheDocument();

    expect(queryByText("Previous Page")).toBeVisible();

    await user.click(getByText("Previous Page"));

    expect(getAllByText("Page 1 Main Articles")[0]).toBeInTheDocument();
  });
});
