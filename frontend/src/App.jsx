import { useState } from "react";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import { AuthProviderWrapper } from "./context/auth.context";

function App() {
  return (
    <div className="App">
      <AuthProviderWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/gifts" element={<HomePage />} />
        </Routes>
      </AuthProviderWrapper>
    </div>
  );
}

export default App;
