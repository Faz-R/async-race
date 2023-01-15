import Page from '../../core/templates/pages';

class GaragePage extends Page {

  static TextObject = {
    GarageTitle: 'Garage page',
  };

  constructor(id: string) {
    super(id)
  }

  render() {
    const title = this.createHeaderTitle(GaragePage.TextObject.GarageTitle);
    this.container.append(title);
    return this.container;
  }
}

export default GaragePage;
