import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars, Car } from "../carData";

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
  const [creditScore, setCreditScore] = useState<number>(700);

  const getInterestRate = (creditScore: number) => {
    if (creditScore >= 750) return 0.03; // 3% for excellent credit
    if (creditScore >= 700) return 0.05; // 5% for good credit
    if (creditScore >= 650) return 0.07; // 7% for fair credit
    if (creditScore >= 600) return 0.09; // 9% for poor credit
    return 0.11; // 11% for very poor credit
  };

  const calculateMonthlyPayment = (
    principal: number,
    interestRate: number,
    termInMonths: number
  ): number => {
    const monthlyRate = interestRate / 12;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) /
      (Math.pow(1 + monthlyRate, termInMonths) - 1)
    );
  };

  useEffect(() => {
    if (make && model && price) {
      const parsedPrice = parseFloat(price);

      const car = cars.find(
        (c) => c.make === make && c.model === model && c.price === parsedPrice
      );

      if (car) {
        setSelectedCar(car);

        // Calculate down payment, monthly payment, and required yearly salary
        const calculatedDownPayment = car.price * 0.2; // 20% of the car price
        setDownPayment(calculatedDownPayment);

        const loanAmount = car.price - calculatedDownPayment;
        const interestRate = getInterestRate(creditScore);
        const termInMonths = 48;
        const calculatedMonthlyPayment = calculateMonthlyPayment(
          loanAmount,
          interestRate,
          termInMonths
        );
        setMonthlyPayment(calculatedMonthlyPayment);
        const calculatedYearlySalary = (calculatedMonthlyPayment / 0.1) * 12;
        setRequiredYearlySalary(calculatedYearlySalary);
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [make, model, price, navigate, creditScore]);

  if (
    !selectedCar ||
    downPayment === null ||
    monthlyPayment === null ||
    requiredYearlySalary === null
  ) {
    // console.log(selectedCar);
    // console.log(downPayment);
    console.log(monthlyPayment);
    // console.log(requiredYearlySalary);
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
      <div className="mb-4">
        <label htmlFor="creditScore" className="block text-xl mb-2">
          Enter Your Credit Score:
        </label>
        <input
          type="number"
          id="creditScore"
          placeholder="700"
          value={creditScore}
          onChange={(e) => {
            const score = Number(e.target.value);
            if (score >= 300 && score <= 850) {
              setCreditScore(score);
            }
          }}
          className="w-full p-2 border rounded-md text-xl"
          min="300"
          max="850"
        />
      </div>
      <button
        onClick={handleGoHome}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Back to Home
      </button>
    </div>
  );
};

export default CarAffordabilityCalculator;
