import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cars } from "../carData";

const HomePage: React.FC = () => {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // Get unique car makes
  const uniqueMakes = Array.from(new Set(cars.map((car) => car.make)));

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(event.target.value);
    setSelectedModel(""); // Reset model selection when make changes
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  // Filter cars based on selected make
  const filteredCars = cars.filter((car) => car.make === selectedMake);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Car Affordability Calculator
        </h1>
        <p className="text-lg sm:text-xl text-center">
          Find out how much car you can afford based on the 20/10/4 rule
        </p>

        {/* Dropdown for Car Make */}
        <select
          value={selectedMake}
          onChange={handleMakeChange}
          className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-semibold"
        >
          <option value="">Select a car make</option>
          {uniqueMakes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>

        {/* Dropdown for Car Models */}
        {selectedMake && (
          <select
            value={selectedModel}
            onChange={handleModelChange}
            className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-semibold mt-4"
          >
            <option value="">Select a car model</option>
            {filteredCars.map((car) => (
              <option key={car.model} value={car.model}>
                {car.model} - ${car.price.toLocaleString()}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-center mt-4">
          {selectedModel && (
            <Link
              to={`/calculator/${encodeURIComponent(
                selectedMake
              )}/${encodeURIComponent(selectedModel)}/${
                filteredCars
                  .find((car) => car.model === selectedModel)
                  ?.price.toString() ?? ""
              }`}
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-blue-100 cursor-pointer"
            >
              Calculate Affordability
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
