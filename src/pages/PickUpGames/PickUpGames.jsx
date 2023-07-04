import React, { useState, useEffect } from 'react';
import * as gamesAPI from '../../utilities/games-api';
import GameCard from '../GameCard/GameCard';
import './PickUpGames.css'
export default function PickUpGames() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  useEffect(() => {
    async function getGames() {
      const games = await gamesAPI.getAll();
      setGames(games);
    }
    getGames();
  }, []);

  // Filter out past games and order by date
  const filteredAndOrderedGames = games
    .filter((game) => new Date(game.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredAndOrderedGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pickup-games-container">
      <h1>Pickup Games</h1>
      <div className="game-cards-container">
        {currentGames.map((game) => (
          <div className="game-card" key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {filteredAndOrderedGames.length > gamesPerPage &&
          Array(Math.ceil(filteredAndOrderedGames.length / gamesPerPage))
            .fill()
            .map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
      </div>
    </div>
  );
}
