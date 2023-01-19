// export interface IState {
//   id?: number
// }

// export interface IAnimState extends IState {
//   id: number
// }

export interface ICar {
  id: number,
  name: string,
  color: string,
  isEngineStarted: boolean
}

export interface IWinner {
  id: number,
  body: ICar,
  time: number
}

export type ISort = 'id' | 'wins' | 'time';

export type IOrder = 'ASC' | 'DESC';