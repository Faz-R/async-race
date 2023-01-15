import Page from '../../core/templates/pages';

class WinnersPage extends Page {

  static TextObject = {
    WinnersTitle: 'Winners page',
  };

  constructor(id: string) {
    super(id)
  }

  render() {
    const title = this.createHeaderTitle(WinnersPage.TextObject.WinnersTitle);
    this.container.append(title);
    return this.container;
  }
}

export default WinnersPage;
