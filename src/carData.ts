// src/carData.ts

export interface Car {
  id: number;
  name: string;
  value: string;
  price: number;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "2023 Porsche 911 Turbo S",
    value: "sports",
    price: 229900,
  },
  {
    id: 2,
    name: "2023 Nissan GT-R",
    value: "sports",
    price: 113540,
  },
  {
    id: 3,
    name: "2023 Ferrari SF90",
    value: "sports",
    price: 507300,
  },
  {
    id: 4,
    name: "2023 Lamborghini Huracan Evo Spyder",
    value: "sports",
    price: 287400,
  },
  {
    id: 5,
    name: "2023 Honda Accord Hybrid",
    value: "sedan",
    price: 27615,
  },
  {
    id: 6,
    name: "2023 Toyota Camry",
    value: "sedan",
    price: 26320,
  },
];
