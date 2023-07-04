import React, { useEffect, useState } from 'react';
import * as gamesAPI from '../../utilities/games-api';
import './JoinedGames.css'
export default function JoinedGames({ user }) {
  const [joinedGames, setJoinedGames] = useState([]);

  useEffect(() => {
    async function fetchJoinedGames() {
      try {
        const allGames = await gamesAPI.getAll();
        const userJoinedGames = allGames.filter(game => game.participants.includes(user.instagram));
        setJoinedGames(userJoinedGames);
      } catch (error) {
        console.error(error);
      }
    }

    fetchJoinedGames();
  }, [user.instagram]);

  return (
    <div className="Joined-Games-Component">
      <h2>Joined Games</h2>
      {joinedGames.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <ul>
          {joinedGames.map((game) => (
            <li key={game._id}>
              <h3>{game.title}</h3>
              <p>Date: {new Date(game.date).toLocaleDateString()}</p>
              <p>Skill Level: {game.skillLevelRequirement}</p>
              {/* Render additional game details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
