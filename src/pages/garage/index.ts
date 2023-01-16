import Page from '../../core/templates/pages';
import carsInfo from '../../scripts/store';
import UI, { updateStateGarage } from '../../scripts/UI';
import { createCar, updateCar, deleteCar, startEngine } from '../../scripts/api';
import App from '../app/index';

let formUpdateLock = true;

class GaragePage extends Page {

  static TextObject = {
    GarageTitle: 'Garage',
  };

  constructor(id: string) {
    super(id)
  }

  render() {
    const title = GaragePage.TextObject.GarageTitle;
    this.container.innerHTML =
      `
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
      <button class="button race-button">race</button>
      <button class="button recet-button">recet</button>
      <button class="button generate-button">generate cars</button>
    </div>
    <h1>${title} (${carsInfo.carsCount})</h1>
    <h3>Page: ${carsInfo.carsPage}</h3>
    ${UI.renderGarage()}
    `;
    return this.container;
  }

  listen(container: HTMLElement) {
    const page = container;
    let id: number;
    page.addEventListener('click', async (e) => {
      const parent = (<HTMLElement>e.target).parentNode;
      if (parent) {
        if ((<HTMLElement>parent).className.includes('remove-button')) {
          const id = Number((<HTMLElement>parent).id.replace('remove-car-', ''));
          await deleteCar(id);
          await updateStateGarage();
          this.render();
        }
        if ((<HTMLElement>parent).className.includes('select-button')) {
          id = Number((<HTMLElement>parent).id.replace('select-car-', ''));
          formUpdateLock = false;
          this.render();

        }
        if ((<HTMLElement>parent).className.includes('start-button')) {
          id = Number((<HTMLElement>parent).id.replace('start-engine-car-', ''));
          const res = await startEngine(id);
          console.log(res)

        }
      }
    })

    page.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(<HTMLFormElement>e.target);

      const name = formData.get('form-text');
      const color = formData.get('form-color');
      const car = { name: name, color: color };

      if ((<HTMLElement>e.target).className.includes('create-block')) {
        await createCar(car);
      }
      if ((<HTMLElement>e.target).className.includes('update-block')) {
        await updateCar(id, car);
        formUpdateLock = true;
      }
      await updateStateGarage();
      this.render();

    })

  }
}


export default GaragePage;
