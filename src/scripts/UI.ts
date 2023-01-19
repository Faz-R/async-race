import { getCar, createCar, deleteCar, getCars, updateCar, startEngine, stopEngine, drive, getWinners } from "./api";
import store from './store';
import { getDistanceBetweenElements, animation } from './utils';
import { ICar } from './interfaces';

const renderCarImage = (color: string) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="70"><path fill="${color}" d="M107 74c-28 0-73 5-73 5s6 1 5 4-13 17-16 19c-2 2-5 2-8 2l-2 4c-5 8-4 17-4 16v1c-7 4-8 6-9 7l1 21c1 2 8 6 12 8a27 27 0 0 1 8-21 27 27 0 0 1 46 19l-1 7h121a27 27 0 1 1 52-1c5 0 14-2 15-4 1-3 3-17 1-25-2-7-13-21-52-29-44-25-63-31-89-33h-7zm2 4c6 0 31 1 56 14 9 5 33 17 30 19-13 11-22-3-86-5l-2-28h2zm-14 0h4l-1 28-55-3c-2-2 8-16 20-21 10-3 25-4 32-4zm126 37h3c2 1 11 4 17 8l9 9c-7 2-32-14-31-16l2-1zm-25 7h10l-3 2h-4l-3-2zm17 13a23 23 0 1 0 0 46 23 23 0 0 0 0-46zm-173 1a23 23 0 1 0 0 46 23 23 0 0 0 0-46zm173 9c3 0 7 2 9 4s4 6 4 9-2 7-4 9-6 4-9 4-7-2-9-4-4-6-4-9 2-7 4-9 6-4 9-4zm-173 1c3 0 6 2 9 4 2 2 3 6 3 9s-1 7-3 9c-3 2-6 4-9 4-4 0-7-2-9-4-3-2-4-6-4-9s1-7 4-9c2-2 5-4 9-4z"/></svg>
`;

const renderCar = ({ id, name, color, isEngineStarted }: ICar) => `
<div class='car-block'>
  <div class='car-settings'>
    <button class="button select-button fa-solid fa-check" id="select-car-${id}"><i class="fa-solid fa-check"></i></button>
    <button class="button remove-button" id="remove-car-${id}"><i class="fa-solid fa-xmark"></i></button>
    <button class="button start-button" id="start-engine-car-${id}" ${isEngineStarted ? 'disabled' : ''}><i class="fa-solid fa-play"></i></button>
    <button class="button stop-button" id="stop-engine-car-${id}" ${!isEngineStarted ? 'disabled' : ''}><i class="fa-solid fa-arrow-rotate-left"></i></button>
    <span class='car-name'>${name}</span>
  </div>
  <div class='road'>
    <div class='car' id='car-${id}'>
      ${renderCarImage(color)}
    </div>
    <div class='flag' id='flag-${id}'>🏁</div>
  </div> 
</div>
`;

const renderGarage = () => {
  return `
  <ul class='garage-list'>
    ${store.cars.map((car: ICar) => `
    <li>${renderCar(car)}</li>
    `).join('')}
  </ul>
`};

export const updateStateGarage = async () => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;
}

const startDriving = async (id: number) => {
  const startButton = document.getElementById(`start-engine-car-${id}`);
  if (startButton instanceof HTMLButtonElement) {
    startButton.disabled = true;
  }

  const { velocity, distance } = await startEngine(id);

  const time = Math.round(distance / velocity);

  if (startButton instanceof HTMLButtonElement) {
    startButton.disabled = true;
  }
  (<HTMLButtonElement>document.getElementById(`stop-engine-car-${id}`)).disabled = false;

  const car = document.getElementById(`car-${id}`);
  const flag = document.getElementById(`flag-${id}`);
  const htmlDistance = Math.floor(getDistanceBetweenElements(car!, flag!)) + 70;

  store.animation[id] = animation(car!, htmlDistance, time);

  const { success } = await drive(id);

  if (!success) window.cancelAnimationFrame(store.animation[id].id);

  return { success, id, time };
}

const stopDriving = async (id: number) => {
  const stopButton = document.getElementById(`stop-engine-car-${id}`);
  if (stopButton instanceof HTMLButtonElement) {
    stopButton.disabled = true;
  }
  await stopEngine(id);

  (<HTMLButtonElement>document.getElementById(`start-engine-car-${id}`)).disabled = false;
  const car = document.getElementById(`car-${id}`);
  if (car) {
    car.style.transform = `translateX(0)`;
  }

  if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id)
}

const updateStateWinners = async () => {
  const { items, count } = await getWinners({ page: store.winnersPage, sort: store.sortBy, order: store.sortOrder });
  store.winners = items;
  store.winnersCount = count;

}


export default {
  renderGarage,
  startDriving,
  stopDriving,
  renderCarImage,
  updateStateWinners
}