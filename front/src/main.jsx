import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./utils/context/authContext";
import { EventProvider } from "./utils/context/eventContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./componnents/LoginPage.jsx";
import RegisterPage from "./componnents/RegisterPage.jsx";
import AdminPage from "./componnents/AdminPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
