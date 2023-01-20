import { getCars, getWinners } from './api';
import { IOrder, ISort, IStoreAnimation } from '../core/interfaces/interfaces';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners({ page: 1, limit: 10, sort: null, order: null });

export default {
  carsPage: 1,
  cars,
  carsCount,
  animation: <IStoreAnimation>{},
  winnersPage: 1,
  winners,
  winnersCount,
  sortBy: <ISort>'id',
  sortOrder: <IOrder>"DESC",
  view: 'garage',
}