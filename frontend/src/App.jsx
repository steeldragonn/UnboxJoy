import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />s
      </Routes>
    </div>
  );
}

export default App;
