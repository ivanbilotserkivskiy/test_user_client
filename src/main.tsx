import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Root } from "./Root.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorCatchingComponent } from "./components/ErrorCatchingComponent.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorCatchingComponent}
      onError={() => console.log("Error happend!")}
    >
      <Root />
    </ErrorBoundary>
  </React.StrictMode>
);
