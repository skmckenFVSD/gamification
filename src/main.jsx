import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import "./styles/faceoff-season.css";
import App from "./App.jsx";
import { SeasonProvider } from "./context/SeasonContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SeasonProvider>
        <App />
      </SeasonProvider>
    </BrowserRouter>
  </React.StrictMode>
);
