import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TokenAuthContextProvider } from "./store/token-auth-context";
import './css/global.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TokenAuthContextProvider>
    <App />
  </TokenAuthContextProvider>
);
