import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cars } from "../carData";

const HomePage: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState("");
  const [customCarName, setCustomCarName] = useState("");
  const [customCarPrice, setCustomCarPrice] = useState("");

  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCar(event.target.value);
    setCustomCarName("");
    setCustomCarPrice("");
  };

  const handleCustomCarNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomCarName(event.target.value);
    setSelectedCar("");
  };

  const handleCustomCarPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomCarPrice(event.target.value);
    setSelectedCar("");
  };

  const isCustomCarValid =
    customCarName.trim() !== "" &&
    !isNaN(Number(customCarPrice)) &&
    Number(customCarPrice) > 0;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Car Affordability Calculator
        </h1>
        <p className="text-lg sm:text-xl text-center">
          Find out how much car you can afford based on the 20/10/4 rule
        </p>

        <select
          value={selectedCar}
          onChange={handleCarChange}
          className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-semibold"
        >
          <option value="">Select a car</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id.toString()}>
              {car.name} - ${car.price.toLocaleString()}
            </option>
          ))}
        </select>

        <div className="text-center">
          <p className="mb-2">Or enter a custom car:</p>
          <input
            type="text"
            value={customCarName}
            onChange={handleCustomCarNameChange}
            placeholder="Custom Car Name"
            className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-semibold mb-2"
          />
          <input
            type="number"
            value={customCarPrice}
            onChange={handleCustomCarPriceChange}
            placeholder="Custom Car Price"
            className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-semibold"
          />
        </div>

        <div className="flex justify-center">
          <Link
            to={
              selectedCar
                ? `/calculator/${selectedCar}`
                : isCustomCarValid
                ? `/calculator/custom/${customCarName}/${customCarPrice}`
                : "#"
            }
            className={`bg-white text-blue-600 px-6 py-3 rounded-full font-semibold transition duration-300 ${
              selectedCar || isCustomCarValid
                ? "hover:bg-blue-100"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={(e) =>
              !(selectedCar || isCustomCarValid) && e.preventDefault()
            }
          >
            Calculate Affordability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
