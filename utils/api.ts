const BASE_URL = 'https://687134f07ca4d06b34b9b681.mockapi.io/properties';

export async function getProperties() {
  const res = await fetch(BASE_URL);
  return res.json();
}
