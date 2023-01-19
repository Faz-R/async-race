import Page from '../../core/templates/pages';
import GaragePage from '../garage/index';
import WinnersPage from '../winners/index';
import Header from '../../core/components/header/index'

export const enum PageIds {
  GaragePage = 'garage',
  WinnersPage = 'winners',
}

class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = 'current-page';

  private initialPage: GaragePage;

  private header: Header;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.getElementById(`${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    if (idPage === PageIds.GaragePage) {
      page = new GaragePage(idPage)
    } else if (idPage === PageIds.WinnersPage) {
      page = new WinnersPage(idPage)
    }

    if (page) {
      const pageHTML = page.render();
      page.listen(pageHTML);
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML)
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    })
  }

  constructor() {
    this.initialPage = new GaragePage('garage');
    this.header = new Header('header', 'header')
  }

  run() {
    const hash = window.location.hash.slice(1);
    App.container.append(this.header.render())
    App.renderNewPage(hash ? hash : 'garage');
    this.enableRouteChange();
  }
}

export default App;
