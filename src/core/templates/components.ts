export default abstract class Components {
  protected container: HTMLElement;

  constructor(tagName: string, clasName: string) {
    this.container = document.createElement(tagName);
    this.container.className = clasName;
  }

  render() {
    return this.container
  }
}

