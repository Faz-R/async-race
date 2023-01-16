import Components from '../../templates/components';
import { PageIds } from '../../../pages/app/index';

const Buttons = [
  {
    id: PageIds.GaragePage,
    text: 'Garage'
  },
  {
    id: PageIds.WinnersPage,
    text: 'Winners'
  }
]

class Header extends Components {
  constructor(tagName: string, clasName: string) {
    super(tagName, clasName);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    pageButtons.className = 'header-buttons';
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      buttonHTML.className = 'header-button button';
      pageButtons.append(buttonHTML);
    })
    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}

export default Header;