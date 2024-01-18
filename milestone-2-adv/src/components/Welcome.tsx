import { useState, useEffect, ReactElement } from "react";
import { useClasses } from "../contexts/classReducer";
import "../styling/welcome.css";

const Welcome = ({
  initialRender,
}: {
  initialRender: boolean;
}): ReactElement => {
  const [container2, setContainer2] = useState<"d-flex" | "d-none">("d-none");
  const [welcomeClass, setWelcomeClass] = useState<string>("");

  const { logo, setLogo } = useClasses({
    theSpan: "the-span-intro",
    topBorder: "intro-top-border",
    container: "d-flex",
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setContainer2("d-flex");
      setLogo("the-span-final", "final-top-border", "d-none");
    }, 1500);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (container2 === "d-flex") {
      id = setTimeout(() => {
        setWelcomeClass("welcome-leave");
      }, 1500);
    }

    return () => clearTimeout(id);
  }, [container2]);

  return (
    <section
      style={{ opacity: initialRender ? "initial" : 0 }}
      className={`welcome-container ${welcomeClass} flex-column align-items-center justify-content-center`}
    >
      <div
        className={`logo-container ${logo.container} flex-row justify-content-center w-100`}
      >
        <p data-p="The" className="me-3">
          <span className={`the-word ${logo.theSpan}`}>The</span>
        </p>
        <div>
          <div className={`hacker-div ${logo.topBorder}`}></div>
          <h1 data-text="Hacker News" className="">
            <span data-testid="welcome-logo" className="hacker-word">
              Hacker News
            </span>
          </h1>
        </div>
      </div>
      <div
        className={`logo-container2 ${container2} flex-row justify-content-center`}
      >
        <div className="left-final-border"></div>

        <p className="me-3 d-flex align-items-center">
          <span
            className={`the-word-final rounded d-flex align-items-center ${logo.theSpan}`}
          >
            The
          </span>
        </p>
        <div>
          <div className={`hacker-div-final ${logo.topBorder}`}></div>
          <h1 data-text-final="Hacker News" className="">
            <span data-testid="welcome-logo" className={`hacker-word-final`}>
              Hacker News
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
