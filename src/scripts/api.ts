const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
// const winners = `${base}/winners`;

export async function getCars(page: number, limit = 7) {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-count'),
  };
}

export const getCar = async (id: number) => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: any) =>
  (await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })).json();


export const deleteCar = async (id: number) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: any) =>
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

const getSortOrder = (sort: any, order: any) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
}

// export const getWinners = async ({page, limit = 10, sort, order}) => {
//   const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
//   const items = await response.json();  
//   return{
//     items: await Promise.all(items.map(async winner => ({ ...winner, car: await getCar(winner.id)}))),
//     count: response.headers.get('X-Total-count')
//   }
// }