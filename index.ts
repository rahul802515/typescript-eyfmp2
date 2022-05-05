interface Car {
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
}

import { faker } from '@faker-js/faker';

let car = (): Car => {
  return {
    name: faker.vehicle.vehicle(),
    model: faker.vehicle.model(),
    yearOfRelease: faker.datatype.number({ min: 1990, max: 2022 }),
    brand: faker.vehicle.manufacturer(),
    color: faker.vehicle.color(),
  };
};

console.log(car());
