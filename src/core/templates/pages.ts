abstract class Page {
  protected container: HTMLElement;
  static TextObject = {

  };

  constructor() {
    this.container = document.createElement('div');
  }

  render() {
    return this.container;
  }

  listen(container: HTMLElement) {
    return;
  }
}

export default Page;