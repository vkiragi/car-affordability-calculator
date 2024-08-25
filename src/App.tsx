import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import "./App.css";
import CarAffordabilityCalculator from "./components/CarAffordabilityCalculator";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/calculator/:carId"
            element={<CarAffordabilityCalculator />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
