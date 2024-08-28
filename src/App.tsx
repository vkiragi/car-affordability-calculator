import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import "./App.css";
import CarAffordabilityCalculator from "./components/CarAffordabilityCalculator";
import VideoBackground from "./components/VideoBackground";

function App() {
  return (
    <Router>
      <div className="App">
        <VideoBackground />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/calculator/:make/:model/:price"
            element={<CarAffordabilityCalculator />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
