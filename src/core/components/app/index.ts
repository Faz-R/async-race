import GaragePage from '../garage/index';
import WinnersPage from '../winners/index';
import Header from '../header/index';
import UI from '../../../scripts/UI';

class App {
  private static container: HTMLElement = document.body;

  private header: Header;

  static updateWinners() {
    const hash = window.location.hash.slice(1);
    (document.getElementById('winners')?.remove());
    const winnersPage = new WinnersPage();
    const winnersHTML = winnersPage.render();
    winnersHTML.id = 'winners';
    if (hash === 'garage') {
      winnersHTML.style.display = 'none';
    }
    winnersPage.listen(winnersHTML);
    App.container.append(winnersHTML);
  }

  static renderPages(idPage: string) {
    const garagePage = new GaragePage();
    const garageHTML = garagePage.render();
    garageHTML.id = 'garage';
    garagePage.listen(garageHTML);
    App.container.append(garageHTML);

    const winnersPage = new WinnersPage();
    const winnersHTML = winnersPage.render();
    winnersHTML.id = 'winners';
    winnersPage.listen(winnersHTML);
    App.container.append(winnersHTML);

    if (idPage) {
      if (idPage === 'garage') {
        (<HTMLElement>document.getElementById('winners')).style.display = 'none';
      } else {
        (<HTMLElement>document.getElementById('garage')).style.display = 'none';
      }
    } else {
      winnersHTML.style.display = 'none';
    }
  }

  static hiddenPage(idPage: string) {
    if (idPage === 'garage') {
      (<HTMLElement>document.getElementById('winners')).style.display = 'none';
      (<HTMLElement>document.getElementById('garage')).style.display = 'block';
    } else {
      (<HTMLElement>document.getElementById('winners')).style.display = 'block';
      (<HTMLElement>document.getElementById('garage')).style.display = 'none';
    }
  }

  constructor() {
    this.header = new Header('header', 'header');
  }

  run() {
    const hash = window.location.hash.slice(1);
    App.container.append(this.header.render());
    App.renderPages(hash || 'garage');
    UI.enableRouteChange();
  }
}

export default App;
