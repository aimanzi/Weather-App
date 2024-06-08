import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./components/router/router";
import { Provider } from "react-redux";
import store from "./components/redux/store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
