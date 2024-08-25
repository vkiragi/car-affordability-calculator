import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { cars, Car } from "../carData"; // Make sure this path is correct

const CarAffordabilityCalculator = () => {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate(); // Add this line
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [downPayment, setDownPayment] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [requiredYearlySalary, setRequiredYearlySalary] = useState<
    number | null
  >(null);

  useEffect(() => {
    const car = cars.find((c) => c.id.toString() === carId);
    if (car) {
      setSelectedCar(car);
      const calculatedDownPayment = car.price * 0.2; // 20% of the car price
      setDownPayment(calculatedDownPayment);
      const loanAmount = car.price - calculatedDownPayment;
      const calculatedMonthlyPayment = loanAmount / 48; // 48 months (4 years)
      setMonthlyPayment(calculatedMonthlyPayment);
      const calculatedYearlySalary = (calculatedMonthlyPayment / 0.1) * 12;
      setRequiredYearlySalary(calculatedYearlySalary);
    }
  }, [carId]);

  if (!selectedCar || downPayment === null) {
    return <div>Loading...</div>;
  }

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="p-8">
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </button>
      <h1 className="text-3xl font-bold mb-4">Car Affordability Calculator</h1>
      <h2 className="text-2xl mb-4">Selected Car: {selectedCar.name}</h2>
      <p className="text-xl">
        20% Down Payment Needed: ${downPayment.toLocaleString()}
      </p>
      <p className="text-xl">
        Monthly Payment Needed: ${monthlyPayment?.toLocaleString()}
      </p>
      <p className="text-xl">Financing Term: 48 Months</p>
      <p className="text-xl">
        Yearly Salary Needed: ${requiredYearlySalary?.toLocaleString()}
      </p>
    </div>
  );
};

export default CarAffordabilityCalculator;
