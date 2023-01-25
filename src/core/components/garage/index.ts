import Page from '../../templates/pages';
import store from '../../../scripts/store';
import { generateRandomCars, getDisabled, race } from '../../../scripts/utils';
import UI, { updateStateGarage } from '../../../scripts/UI';
import {
  createCar, updateCar, deleteCar, saveWinner, deleteWinner,
} from '../../../scripts/api';
import App from '../app/index';

let formUpdateLock = true;

let nextPage = true;
let prevPage = true;
const maxPages = Math.ceil(Number(store.carsCount) / 7);

if (store.carsPage < maxPages) {
  nextPage = false;
}

class GaragePage extends Page {
  static TextObject = {
    GarageTitle: 'Garage',
  };

  render() {
    const title = GaragePage.TextObject.GarageTitle;
    this.container.innerHTML = `
    <div class='message-block' id='message'></div>
    <form class="create-block block">
      <input type='text' class='input create-text' name='form-text'>
      <input type='color' class='input input-color create-color' name='form-color'>
      <button class="button" id='create-button'>create</button>
    </form>
    <form class="update-block block" ${formUpdateLock ? 'disabled = \'true\'' : ''}>
      <input type='text' class='input' name='form-text' ${formUpdateLock ? 'disabled = \'true\'' : ''}>
      <input type='color' class='input input-color' name='form-color' ${formUpdateLock ? 'disabled = \'true\'' : ''}>
      <button class="button update-button" ${formUpdateLock ? 'disabled = \'true\'' : ''}>update</button>
    </form>
    <div class="race-block block">
      <button class="button race-button" id="race">race</button>
      <button class="button reset-button" id="reset" disabled=true>reset</button>
      <button class="button generate-button">generate cars</button>
    </div>
    <h1>${title} (${store.carsCount})</h1>
    <div class='pagination'>
      <button class='page-prev button' ${prevPage ? 'disabled = \'true\'' : ''} id='prev-garage-page'>❮</button>
      <div>Page: ${store.carsPage}</div>
      <button class='page-next button' ${nextPage ? 'disabled = \'true\'' : ''} id='next-garage-page'>❯</button>
    </div>
    ${UI.renderGarage()}
    `;
    return this.container;
  }

  listen(container: HTMLElement) {
    let idCar: number;
    container.addEventListener('click', async (e) => {
      const element = (<HTMLElement>e.target);
      if (element) {
        if (element.closest('.remove-button')) {
          const CarId = Number((element).id.replace('remove-car-', ''));
          await deleteCar(CarId);
          await deleteWinner(CarId);
          await updateStateGarage();
          await UI.updateStateWinners();
          App.updateWinners();
          this.render();
        }
        if (element.closest('.select-button')) {
          idCar = Number((element).id.replace('select-car-', ''));
          formUpdateLock = false;
          this.render();
        }
        if (element.closest('.start-button')) {
          idCar = Number((element).id.replace('start-engine-car-', ''));
          await UI.startDriving(idCar);
        }
        if (element.closest('.stop-button')) {
          idCar = Number((element).id.replace('stop-engine-car-', ''));
          await UI.stopDriving(idCar);
        }
        if (element.closest('.page-next')) {
          if (store.carsPage < maxPages) {
            prevPage = false;
            store.carsPage += 1;
            if (store.carsPage === maxPages) {
              nextPage = true;
            }
            await updateStateGarage();
            this.render();
          }
        }
        if (element.closest('.page-prev')) {
          if (store.carsPage > 1) {
            nextPage = false;
            store.carsPage -= 1;
            if (store.carsPage === 1) {
              prevPage = true;
            }
            await updateStateGarage();
            this.render();
          }
        }
      }
      if (element) {
        if (element.closest('.generate-button')) {
          const cars = generateRandomCars();
          nextPage = false;
          cars.forEach(async (elems) => {
            await createCar(elems);
            await updateStateGarage();
            this.render();
          });
        }
        if (element.closest('.race-button')) {
          (<HTMLButtonElement>element).disabled = true;

          getDisabled(Array.from(document.querySelectorAll('.remove-button')));
          getDisabled(Array.from(document.querySelectorAll('.select-button')));
          getDisabled(Array.from(document.querySelectorAll('.start-button')));
          (<HTMLButtonElement>document.querySelector('.page-prev')).disabled = true;
          (<HTMLButtonElement>document.querySelector('.page-next')).disabled = true;

          const winner = await race(UI.startDriving, true);
          await saveWinner(winner);
          await UI.updateStateWinners();
          App.updateWinners();

          const message = document.getElementById('message');
          if (message) {
            message.innerHTML = `${winner.name} went first ${winner.time}s!`;
            message.classList.toggle('visible', true);
          }

          getDisabled(Array.from(document.querySelectorAll('.remove-button')));
          getDisabled(Array.from(document.querySelectorAll('.select-button')));
          getDisabled(Array.from(document.querySelectorAll('.start-button')));
          getDisabled(Array.from(document.querySelectorAll('.stop-button')));
          (<HTMLButtonElement>document.querySelector('.page-prev')).disabled = false;
          (<HTMLButtonElement>document.querySelector('.page-next')).disabled = false;

          (<HTMLButtonElement>document.getElementById('reset')).disabled = false;
        }
        if (element.closest('.reset-button')) {
          (<HTMLButtonElement>element).disabled = true;
          store.cars.map(({ id }: { id: number }) => UI.stopDriving(id));
          const message = document.getElementById('message');
          message?.classList.toggle('visible', false);
          (<HTMLButtonElement>document.getElementById('race')).disabled = false;
        }
      }
    });

    container.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = (<HTMLFormElement>e?.target);
      const formData = new FormData(form);
      let name = formData.get('form-text') as string;
      let color = formData.get('form-color') as string;

      if (!name) {
        name = '';
      }
      if (!color) {
        color = '#000000';
      }
      const car = { name, color };

      if ((<HTMLElement>e.target).closest('.create-block')) {
        await createCar(car);
      }
      if ((<HTMLElement>e.target).closest('.update-block')) {
        await updateCar(idCar, car);
        formUpdateLock = true;
      }
      await updateStateGarage();
      this.render();
    });
  }
}

export default GaragePage;
