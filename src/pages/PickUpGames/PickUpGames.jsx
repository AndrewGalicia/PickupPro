import React, { useState, useEffect } from 'react';
import { getGames } from '../../utilities/games-api'


export default function PickUpGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const fetchGames = async () => {
    try {
      const fetchedGames = await getGames();
      setGames(fetchedGames);
    } catch (error) {
      console.error(error);
      // Handle error while fetching games
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Pickup Games</h2>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

const GameCard = ({ game }) => {
  // Render individual game card
  // ...
};
