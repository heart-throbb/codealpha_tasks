import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
          },
        }}
      />
    </AuthProvider>
  </BrowserRouter>,
);
