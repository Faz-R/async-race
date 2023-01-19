import { getCars, getWinners } from './api';
import { ICar, IOrder } from './interfaces';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners({ page: 1, limit: 10, sort: null, order: null });

export default {
  carsPage: 1,
  cars,
  carsCount,
  animation: <any>{},
  winnersPage: 1,
  winners,
  winnersCount,
  sortBy: 'id',
  sortOrder: <IOrder>"DESC",
  view: 'garage',
}