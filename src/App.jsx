import Router from "./Router";
import { GlobalProvider } from "./store/GlobalStore";

const App = () => {
  console.log("app!!!");
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
};

export default App;
