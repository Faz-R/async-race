import Page from '../../core/templates/pages';
import store from '../../scripts/store';
import UI from '../../scripts/UI';
import { ISort, IOrder } from '../../scripts/interfaces';

let nextPage = false;
let prevPage = true;

const maxPages = Math.ceil(Number(store.winnersCount) / 10)
if (store.winnersPage >= maxPages) {
  nextPage = true;
}


class WinnersPage extends Page {

  static TextObject = {
    WinnersTitle: 'Winners',
  };

  render() {
    const title = WinnersPage.TextObject.WinnersTitle;
    this.container.innerHTML = `
    <h1>${title} (${store.winnersCount})</h1>
    <div class='pagination'>
      <button class='page-prev button' ${prevPage ? 'disabled' : ''}><i class="fa-solid fa-chevron-left"></i></button>
      <div>Page: ${store.winnersPage}</div>
      <button class='page-next button' ${nextPage ? 'disabled' : ''}><i class="fa-solid fa-chevron-right"></i></button>
    </div>
    <table class='table'>
      <tr class='table-row head-row'>
        <th class='table-col-head' id='sort-by-id'>№</th>
        <th class='table-col-head'>Car</th>
        <th class='table-col-head'>Name</th>
        <th class='table-col-head col-wins' id='sort-by-wins'>
          Wins 
          ${store.sortBy === 'wins' ? store.sortOrder === 'DESC' ? '▼' : '▲' : ''}
        </th>
        <th class='table-col-head col-time' id='sort-by-time'>
          Best time(s) 
          ${store.sortBy === 'time' ? store.sortOrder === 'DESC' ? '▼' : '▲' : ''}
        </th>
      </tr>
      <tbody>
      ${store.winners.map((winner, index) =>
      `<tr class='table-row'>
        <td class='table-col'>${index + 1 + ((store.winnersPage - 1) * 10)}</td>
        <td class='table-col col-img'>${UI.renderCarImage(winner.car.color)}</td>
        <td class='table-col'>${winner.car.name}</td>
        <td class='table-col'>${winner.wins}</td>
        <td class='table-col'>${winner.time}</td>
      </tr>`
    ).join('')}
      </tbody>
    </table>
    `;
    return this.container;
  }

  listen(container: HTMLElement) {
    const page = container;
    page.addEventListener('click', async (e) => {
      const parent = (<HTMLElement>e.target).parentNode;
      const element = (<HTMLElement>e.target);
      if ((<HTMLElement>parent).className.includes('page-next')) {
        if (store.winnersPage < maxPages) {
          prevPage = false;
          store.winnersPage = store.winnersPage + 1;
          if (store.winnersPage === maxPages) {
            nextPage = true;
          }
          await UI.updateStateWinners();
          this.render();
        }
      }
      if ((<HTMLElement>parent).className.includes('page-prev')) {
        if (store.winnersPage > 1) {
          nextPage = false;
          store.winnersPage = store.winnersPage - 1;
          if (store.winnersPage === 1) {
            prevPage = true;
          }
          await UI.updateStateWinners();
          this.render();
        }
      }

      if (element.id === 'sort-by-wins') {
        store.sortBy = 'wins';
        (store.sortOrder === 'DESC') ? store.sortOrder = "ASC" : store.sortOrder = "DESC";
        await UI.updateStateWinners();
        this.render();
      }

      if (element.id === 'sort-by-time') {
        store.sortBy = 'time';
        (store.sortOrder === 'DESC') ? store.sortOrder = "ASC" : store.sortOrder = "DESC";
        await UI.updateStateWinners();
        this.render();
      }

    })
  }
}

export default WinnersPage;
