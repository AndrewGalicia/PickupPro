import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as gamesAPI from '../../utilities/games-api';

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    async function fetchGame() {
      try {
        const fetchedGame = await gamesAPI.getById(id);
        setGame(fetchedGame);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const { title, date, skillLevelRequirement, address, city, participants } = game;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div>
      <h2>{title}</h2>
      <p>Date: {formattedDate} {formattedTime}</p>
      <p>Skill Level: {skillLevelRequirement}</p>
      <p>Address: {address}</p>
      <p>City: {city}</p>
      <p>Participants: {participants.length}</p>
    </div>
  );
}
