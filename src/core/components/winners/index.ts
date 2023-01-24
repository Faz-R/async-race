import Page from '../../templates/pages';
import store from '../../../scripts/store';
import UI from '../../../scripts/UI';
import { getSort } from '../../../scripts/utils';

class WinnersPage extends Page {
  static TextObject = {
    WinnersTitle: 'Winners',
  };

  nextPage = false;

  prevPage = true;

  maxPages = Math.ceil(Number(store.winnersCount) / 10);

  render() {
    if (store.winnersPage >= this.maxPages) {
      this.nextPage = true;
    }
    const title = WinnersPage.TextObject.WinnersTitle;

    this.container.innerHTML = `
    <h1>${title} (${store.winnersCount})</h1>
    <div class='pagination'>
      <button class='page-prev button' ${this.prevPage ? 'disabled' : ''}><i class="fa-solid fa-chevron-left"></i></button>
      <div>Page: ${store.winnersPage}</div>
      <button class='page-next button' ${this.nextPage ? 'disabled' : ''}><i class="fa-solid fa-chevron-right"></i></button>
    </div>
    <table class='table'>
      <tr class='table-row head-row'>
        <th class='table-col-head' id='sort-by-id'>№</th>
        <th class='table-col-head'>Car</th>
        <th class='table-col-head'>Name</th>
        <th class='table-col-head col-wins' id='sort-by-wins'>
          Wins 
          ${getSort('wins')}
        </th>
        <th class='table-col-head col-time' id='sort-by-time'>
          Best time(s) 
          ${getSort('time')}
        </th>
      </tr>
      <tbody>
      ${store.winners.map((winner, index) => `<tr class='table-row'>
        <td class='table-col'>${index + 1 + ((store.winnersPage - 1) * 10)}</td>
        <td class='table-col col-img'>${UI.renderCarImage(winner.car.color)}</td>
        <td class='table-col'>${winner.car.name}</td>
        <td class='table-col'>${winner.wins}</td>
        <td class='table-col'>${winner.time}</td>
      </tr>`).join('')}
      </tbody>
    </table>
    `;
    return this.container;
  }

  listen(container: HTMLElement) {
    container.querySelector('.page-prev')?.addEventListener('click', async () => {
      if (store.winnersPage > 1) {
        this.nextPage = false;
        store.winnersPage -= 1;
        if (store.winnersPage === 1) {
          this.prevPage = true;
        }
        await UI.updateStateWinners();
        this.render();
      }
    });

    container.querySelector('.page-next')?.addEventListener('click', async () => {
      if (store.winnersPage < this.maxPages) {
        this.prevPage = false;
        store.winnersPage += 1;
        if (store.winnersPage === this.maxPages) {
          this.nextPage = true;
        }
        await UI.updateStateWinners();
        this.render();
      }
    });

    container.addEventListener('click', async (e) => {
      const element = (<HTMLElement>e.target);
      if (element.id === 'sort-by-wins') {
        store.sortBy = 'wins';
        store.sortOrder = (store.sortOrder === 'DESC') ? 'ASC' : 'DESC';
        await UI.updateStateWinners();
        this.render();
      }
      if (element.id === 'sort-by-time') {
        store.sortBy = 'time';
        store.sortOrder = (store.sortOrder === 'DESC') ? 'ASC' : 'DESC';
        await UI.updateStateWinners();
        this.render();
      }
    });
  }
}

export default WinnersPage;
