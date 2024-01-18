import { useContext, useEffect, useRef, useState, ReactElement } from "react";
import Header from "./header/Header";
import Welcome from "./Welcome";
import SearchContext from "../contexts/SearchContext";
import Footer from "./footer/Footer";
import PlaceHolderMain from "./placeholders/PlaceHolderMain";
import useMediaQuery from "../hooks/useMediaQuery";
import "../styling/mainPage.css";
import Main from "./Main";

const App = (): ReactElement => {
  const { loading, fullArticles, topArticles } = useContext(SearchContext);
  const [display, setDisplay] = useState<string>("d-none");
  const [initialRender, setInitialRender] = useState(true);
  const [mainSectionVisibility, setMainSectionVisibility] =
    useState<boolean>(false);
  const [mainClass, setMainClass] = useState("");

  const is1000 = useMediaQuery(1000);

  const visibilityRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setDisplay("");
    }, 3500);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (visibilityRef.current) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setMainSectionVisibility(entry.isIntersecting);
      });

      observer.observe(visibilityRef.current);
    }
  }, []);

  useEffect(() => {
    if (mainSectionVisibility && initialRender) {
      const html = document.getElementsByTagName("html")[0];

      html.style.scrollSnapType = "none";
      setInitialRender(false);
    }
  }, [mainSectionVisibility]);

  useEffect(() => {
    if (!loading) {
      setMainClass("main-enter");
    }
  }, [loading]);

  return (
    <>
      {(!fullArticles || !topArticles) && (
        <Welcome initialRender={initialRender} />
      )}
      <div className={`${display} main-container container-fluid gx-0`}>
        <Header />
        <div ref={visibilityRef} className="divider mb-3"></div>
        {loading ? (
          <PlaceHolderMain />
        ) : (
          <Main mainClass={mainClass} is1000={is1000} />
        )}
        <Footer is1000={is1000} />
      </div>
    </>
  );
};

export default App;
