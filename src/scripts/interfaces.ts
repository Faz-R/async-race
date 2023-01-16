export interface IState {
  id?: number
}

export interface IAnimState {
  id: IState;
}

export interface ICar {
  id: number,
  name: string,
  color: string,
  isEngineStarted: boolean
}