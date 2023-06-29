// games-api.js

import { sendRequest } from './send-request';

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

export async function getGames() {
  try {
    const fetchedGames = await sendRequest(BASE_URL);
    return fetchedGames;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
