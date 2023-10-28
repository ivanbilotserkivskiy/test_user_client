import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Root } from "./Root.tsx";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Root />
    </CookiesProvider>
  </React.StrictMode>
);
