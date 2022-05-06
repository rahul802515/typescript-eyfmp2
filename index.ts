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
import { Observable, filter, interval } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, take } from 'rxjs/operators';
import Axios from 'axios-observable';

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
  }, 1000);
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

// obs3.subscribe((val) => {
//   console.log(val);
// });

let obs4 = interval(1000).pipe(
  switchMap((value) =>
    Axios.get('https://random-data-api.com/api/color/random_color')
  )
);

// obs4.subscribe((val) => {
//   // console.log(val.data);
// });

let obs5 = interval(100).pipe(
  concatMap((value) =>
    Axios.get('https://random-data-api.com/api/color/random_color')
  )
);

// obs5.subscribe((val) => {
//   console.log(val.data);
// });

let obs6 = interval(50).pipe(
  take(5),
  mergeMap((value) =>
    Axios.get('https://random-data-api.com/api/color/random_color')
  )
);

obs6.subscribe((val) => {
  console.log(val.data);
});

// observer.next(response.data);
// observer.complete();

// .catch((erroe) =>{
//   observer.error(error);
// })

// obs4.subscribe((val) => {
//   console.log(val);
// });

// let obs4 = new Observable((observer) => {
//   axios
//     .get('https://jsonplaceholder.typicode.com/users')
//     .then((response) => {
//       observer.next(response.data);
//       observer.complete();
//     })
//     .catch((error) => {
//       observer.error(error);
//     });
// });

// let obs5 = obs4.pipe(
//   switchMap(value =>{
//     console.log(value)
//     return value
//   })
// )
