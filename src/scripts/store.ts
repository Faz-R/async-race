import { getCars } from './api';
import { ICar } from './interfaces';

const { items: cars, count: carsCount } = await getCars(1);



export default {
  carsPage: 1,
  cars,
  carsCount,
  animation: <any>{}
}