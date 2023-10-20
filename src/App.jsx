import Router from "./Router";
import { GlobalProvider } from "./store/GlobalStore";
import "./global.scss";

const App = () => {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
};

export default App;
