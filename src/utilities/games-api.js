import sendRequest from './send-request';

const BASE_URL = '/api/games';

export async function createGame(newGame) {
  try {
    const createdGame = await sendRequest(BASE_URL, 'POST', newGame);
    return createdGame;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getAll() {
  return sendRequest(BASE_URL);
}

export async function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
