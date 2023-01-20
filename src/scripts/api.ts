import { ICar, IWinner } from "../core/interfaces/interfaces";

const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export async function getCars(page: number, limit = 7) {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-count'),
  };
}

export const getCar = async (id: number) => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: ICar) =>
  (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })).json();


export const deleteCar = async (id: number) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: ICar) =>
  (await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })).json();


export const startEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const drive = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
}

const getSortOrder = (sort: string | null, order: string | null) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
}

export const getWinners = async ({ page, limit = 10, sort, order }: { page: number, limit?: number, sort: string | null, order: string | null }) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();
  return {
    items: await Promise.all(items.map(async (winner: IWinner) => ({ ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-count')
  }
}

export const getWinner = async (id: number) => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number) => (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id: number) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: IWinner) => (await fetch(`${winners}`, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  }
})).json();

export const updateWinner = async (id: number, body: IWinner) => (await fetch(`${winners}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  }
})).json();

export const saveWinner = async ({ id, time }: {
  color: string; id: number; name: string; time: number;
}) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    })
  }
}