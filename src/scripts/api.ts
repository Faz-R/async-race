const base = 'http://localhost:3000';

const garage = `${base}/garage`;
// const engine = `${base}/engine`;
// const winners = `${base}/winners`;

export default async function getCars(page: number, limit = 7) {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-count'),
  };
}
