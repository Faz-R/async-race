import Page from '../../core/templates/pages';

class WinnersPage extends Page {

  static TextObject = {
    WinnersTitle: 'Winners',
  };

  constructor(id: string) {
    super(id)
  }

  render() {
    const title = WinnersPage.TextObject.WinnersTitle;
    this.container.innerHTML = `<h1>${title}<h1>`;
    return this.container;
  }
}

export default WinnersPage;
