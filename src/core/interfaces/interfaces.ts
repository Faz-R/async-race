export enum PageIds {
  // eslint-disable-next-line no-unused-vars
  GaragePage = 'garage',
  // eslint-disable-next-line no-unused-vars
  WinnersPage = 'winners',
}

export interface ICar {
  id?: number,
  name: string,
  color: string,
}

export interface IWinner {
  id: number,
  wins: number,
  time: number
}

export interface IAnimation {
  car: HTMLElement,
  distance: number,
  animationTime: number
}

export type IStoreAnimation = {
  [id: number]: { id: number };
}

export type ISort = 'id' | 'wins' | 'time';

export type IOrder = 'ASC' | 'DESC';
