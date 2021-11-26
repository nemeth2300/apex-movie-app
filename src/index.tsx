import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { initialiseAxios } from "./api/index";
import App from "./components/App";

const initialise = () => {
  initialiseAxios();
};

const client = new ApolloClient({
  uri: "https://tmdb.sandbox.zoosh.ie/dev/grphql",
  cache: new InMemoryCache(),
});

initialise();
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
