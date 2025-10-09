import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';        // относительный путь
import App from "./App";     // импорт App компонента

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
