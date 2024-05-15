import React from "react";
import createMessage from "./pages/createMessage";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Auth />} />
            <Route
              path="/createMessage"
              element={<createMessage />}
            />
          </Routes>
      </div>
    </Router>
  );
}