import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars, Car } from "../carData"; // Make sure this path is correct

const CarAffordabilityCalculator = () => {
  const { make, model, price } = useParams<{
    make: string;
    model: string;
    price: string;
  }>();
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [downPayment, setDownPayment] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [requiredYearlySalary, setRequiredYearlySalary] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (make && model && price) {
      const parsedPrice = parseFloat(price);

      // Find the car based on make, model, and price
      const car = cars.find(
        (c) => c.make === make && c.model === model && c.price === parsedPrice
      );

      if (car) {
        setSelectedCar(car);

        // Calculate down payment, monthly payment, and required yearly salary
        const calculatedDownPayment = car.price * 0.2; // 20% of the car price
        setDownPayment(calculatedDownPayment);

        const loanAmount = car.price - calculatedDownPayment;
        const calculatedMonthlyPayment = loanAmount / 48; // 48 months (4 years)
        setMonthlyPayment(calculatedMonthlyPayment);

        const calculatedYearlySalary = (calculatedMonthlyPayment / 0.1) * 12;
        setRequiredYearlySalary(calculatedYearlySalary);
      } else {
        // If car not found, navigate back to the home page
        navigate("/");
      }
    } else {
      // If any of the parameters are missing, navigate back to the home page
      navigate("/");
    }
  }, [make, model, price, navigate]);

  if (
    !selectedCar ||
    downPayment === null ||
    monthlyPayment === null ||
    requiredYearlySalary === null
  ) {
    return <div>Loading...</div>;
  }

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Car Affordability Calculator</h1>
      <h2 className="text-2xl mb-4">
        Selected Car: {selectedCar.make} {selectedCar.model}
      </h2>
      <p className="text-xl mb-2">
        Car Price: ${selectedCar.price.toLocaleString()}
      </p>
      <p className="text-xl mb-2">
        20% Down Payment Needed: ${downPayment.toLocaleString()}
      </p>
      <p className="text-xl mb-2">
        Monthly Payment Needed: $
        {monthlyPayment.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <p className="text-xl mb-2">Financing Term: 48 Months</p>
      <p className="text-xl mb-2">
        Yearly Salary Needed: $
        {requiredYearlySalary.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <button
        onClick={handleGoHome}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export default CarAffordabilityCalculator;
