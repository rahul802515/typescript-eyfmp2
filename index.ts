interface Car {
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
}

interface Scrap {
  brand: string;
  yearOfRelease: number;
}

import { faker } from '@faker-js/faker';
import { Observable, filter } from 'rxjs';
import { map } from 'rxjs/operators';

let car = (): Car => {
  return {
    name: faker.vehicle.vehicle(),
    model: faker.vehicle.model(),
    yearOfRelease: faker.datatype.number({ min: 1000, max: 5000 }),
    brand: faker.vehicle.manufacturer(),
    color: faker.vehicle.color(),
  };
};

let obs = new Observable((observer) => {
  setInterval(() => {
    observer.next(car());
  }, 100);
});

// obs.subscribe((val) => {
//   // console.log(val);
// });

let obs2 = obs.pipe(
  filter<Car>((obj) => obj.color === 'black' && obj.yearOfRelease < 2000)
);

let obs3 = obs2.pipe(
  map((obj) => {
    return { brand: obj.brand, yearOfRelease: obj.yearOfRelease };
  })
);

obs3.subscribe((val) => {
  console.log(val);
});
