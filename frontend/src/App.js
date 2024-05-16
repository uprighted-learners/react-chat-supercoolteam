import React from "react";
import CreateMessage from "./pages/createMessage"; 
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import RoomPage from "./pages/RoomPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/createMessage" element={<CreateMessage />} />
            <Route path="/room/:id" element={<RoomPage />} />
          </Routes>
      </div>
    </Router>
  );
}
