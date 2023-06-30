import React, { useState, useEffect } from 'react';
import * as gamesAPI from '../../utilities/games-api'
import GameCard from '../GameCard/GameCard'


export default function PickUpGames() {
  const [games, setGames] = useState([]);

  useEffect(function() {
    async function getGames() {
      const games = await gamesAPI.getAll();
      setGames(games)
    }
    getGames();
  }, [])



  

  return (
    <div>
      <h2>Pickup Games</h2>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}


