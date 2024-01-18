import Articles from "./articles/Articles";
import CallToAction from "./CallToAction";

const Main = ({
  is1000,
  mainClass,
}: {
  is1000: boolean;
  mainClass: string;
}) => {
  return (
    <main className={`main-content ${mainClass}`}>
      <Articles is1000={is1000} />
      <CallToAction />
    </main>
  );
};

export default Main;
