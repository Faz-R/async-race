import Page from '../../templates/pages';
import store from '../../../scripts/store';
import { generateRandomCars, race } from '../../../scripts/utils';
import UI, { updateStateGarage } from '../../../scripts/UI';
import {
  createCar, updateCar, deleteCar, saveWinner, deleteWinner,
} from '../../../scripts/api';
import App from '../app/index';

let formUpdateLock = true;

let nextPage = true;
let prevPage = true;

class GaragePage extends Page {
  static TextObject = {
    GarageTitle: 'Garage',
  };

  render() {
    const maxPages = Math.ceil(Number(store.carsCount) / 7);

    if (store.carsPage < maxPages) {
      nextPage = false;
    }
    const title = GaragePage.TextObject.GarageTitle;
    this.container.innerHTML = `
    <div class='message-block' id='message'></div>
    <form class="create-block block">
      <input type='text' class='input create-text' name='form-text'>
      <input type='color' class='input input-color create-color' name='form-color'>
      <button class="button" id='create-button'>create</button>
    </form>
    <form class="update-block block" ${formUpdateLock ? 'disabled' : ''}>
      <input type='text' class='input' name='form-text' ${formUpdateLock ? 'disabled' : ''}>
      <input type='color' class='input input-color' name='form-color' ${formUpdateLock ? 'disabled' : ''}>
      <button class="button update-button" ${formUpdateLock ? 'disabled' : ''}>update</button>
    </form>
    <div class="race-block block">
      <button class="button race-button" id="race">race</button>
      <button class="button reset-button" id="reset" disabled=true>reset</button>
      <button class="button generate-button">generate cars</button>
    </div>
    <h1>${title} (${store.carsCount})</h1>
    <div class='pagination'>
      <button class='page-prev button' ${prevPage ? 'disabled' : ''} id='prev-garage-page'><i class="fa-solid fa-chevron-left"></i></button>
      <div>Page: ${store.carsPage}</div>
      <button class='page-next button' ${nextPage ? 'disabled' : ''} id='next-garage-page'><i class="fa-solid fa-chevron-right"></i></button>
    </div>
    ${UI.renderGarage()}
    `;
    return this.container;
  }

  listen(container: HTMLElement) {
    let idCar: number | null;
    container.querySelector('.page-next')?.addEventListener('click', async () => {
      const maxPages = Math.ceil(Number(store.carsCount) / 7);
      if (store.carsPage < maxPages) {
        prevPage = false;
        store.carsPage += 1;
        if (store.carsPage === maxPages) {
          nextPage = true;
        }
        await updateStateGarage();
        this.render();
        this.listen(this.render());
      }
    });
    container.querySelector('.page-prev')?.addEventListener('click', async () => {
      if (store.carsPage > 1) {
        nextPage = false;
        store.carsPage -= 1;
        if (store.carsPage === 1) {
          prevPage = true;
        }
        await updateStateGarage();
        this.render();
        this.listen(this.render());
      }
    });

    container.querySelector('.generate-button')?.addEventListener('click', async () => {
      const cars = generateRandomCars();
      nextPage = false;
      cars.forEach(async (elems) => {
        await createCar(elems);
        await updateStateGarage();
        this.render();
        this.listen(this.render());
      });
    });

    container.querySelector('.race-button')?.addEventListener('click', async (raceE) => {
      const raceBnt = raceE.target;
      (<HTMLButtonElement>raceBnt).disabled = true;

      const prevBtn = <HTMLButtonElement>document.querySelector('.page-prev');
      const nextBtn = <HTMLButtonElement>document.querySelector('.page-next');
      prevBtn.disabled = true;
      nextBtn.disabled = true;

      const winner = await race(UI.startDriving);
      await saveWinner(winner);
      await UI.updateStateWinners();
      App.updateWinners();

      const message = document.getElementById('message');
      if (message) {
        message.innerHTML = `${winner.name} went first ${winner.time}s!`;
        message.classList.toggle('visible', true);
      }

      (<HTMLButtonElement>document.getElementById('reset')).disabled = false;
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    });

    container.querySelector('.reset-button')?.addEventListener('click', async (resetE) => {
      const resetBtn = resetE.target;
      (<HTMLButtonElement>resetBtn).disabled = true;
      store.cars.map(({ id }: { id: number }) => UI.stopDriving(id));
      const message = document.getElementById('message');
      message?.classList.toggle('visible', false);
      (<HTMLButtonElement>document.getElementById('race')).disabled = false;
    });

    container.querySelector('.garage-list')?.addEventListener('click', async (e) => {
      const element = <HTMLElement>e.target;
      if (element) {
        if (element.className.includes('remove-button')) {
          const CarId = Number((element).id.replace('remove-car-', ''));
          await deleteCar(CarId);
          await deleteWinner(CarId);
          await updateStateGarage();
          await UI.updateStateWinners();
          App.updateWinners();
          if (store.carsPage > Math.ceil(Number(store.carsCount) / 7)) {
            store.carsPage -= 1;
            await updateStateGarage();
          }
          this.render();
          this.listen(this.render());
        }
        if ((element).className.includes('select-button')) {
          idCar = Number((element).id.replace('select-car-', ''));
          formUpdateLock = false;
          this.render();
          this.listen(this.render());
        }
        if ((element).className.includes('start-button')) {
          idCar = Number((element).id.replace('start-engine-car-', ''));
          await UI.startDriving(idCar);
        }
        if ((element).className.includes('stop-button')) {
          idCar = Number((element).id.replace('stop-engine-car-', ''));
          await UI.stopDriving(idCar);
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

      if ((<HTMLElement>e.target).className.includes('create-block')) {
        await createCar(car);
      }
      if ((<HTMLElement>e.target).className.includes('update-block')) {
        if (idCar) {
          await updateCar(idCar, car);
        }
        idCar = null;
        formUpdateLock = true;
      }
      await updateStateGarage();
      this.render();
      this.listen(this.render());
    });
  }
}

export default GaragePage;
