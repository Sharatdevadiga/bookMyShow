import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Spinner from "./components/spinner/Spinner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Spinner />}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);
