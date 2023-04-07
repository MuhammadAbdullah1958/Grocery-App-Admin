import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Router, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Auth } from "./auth";
import history from "./@history";
import store from "./store/index";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";

function Root() {
  // Create a client
 const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Auth>
          <Router history={history}>
            <QueryClientProvider client={queryClient}>
              <Route path="/" component={App} />
            </QueryClientProvider>
          </Router>
        </Auth>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
