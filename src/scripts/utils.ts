import store from './store';

function getPositionAtCenter(element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2
  }
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export function animation(car: HTMLElement, distance: number, animationTime: number) {
  let start = 0;
  const state = <any>{};

  function step(timestamp: number) {
    if (!start) { start = timestamp; }
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));
    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);

  return state;
}

const models = ['Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lada', 'Mazda', 'Toyota'];
const names = ['A6', 'Cabriolet', 'Sport', 'TT', 'Caprice', 'Daster', 'Matiz', 'Tornado', 'Volt'];

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * models.length)];
  return `${model} ${name}`;
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const generateRandomCars = (count = 100) => new Array(count).fill(1).map(_ => ({ name: getRandomName(), color: getRandomColor() }));