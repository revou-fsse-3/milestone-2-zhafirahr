import ReactDOM from "react-dom/client";
import App from "./components/App";
import { SearchStore } from "./contexts/SearchContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <SearchStore>
    <App />
  </SearchStore>
);
