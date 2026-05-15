import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import "./styles/faceoff-season.css";
import "./styles/profile-identity.css";
import App from "./App.jsx";
import { SeasonProvider } from "./context/SeasonContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <SeasonProvider>
          <App />
        </SeasonProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
