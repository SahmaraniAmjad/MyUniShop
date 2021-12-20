import { Provider } from "react-redux";
import store from "./store/store";
import { Router } from "./routing";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
