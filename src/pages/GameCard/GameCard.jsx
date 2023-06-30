import React from 'react';
import './GameCard.css';

export default function GameCard({ game }) {
  const { title, date, skillLevelRequirement, city, participants } = game;

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
    <div className="GameCard">
      <h2>{title}</h2>
      <p>Date: {formattedDate} {formattedTime}</p>
      <p>Skill Level: {skillLevelRequirement}</p>
      <p>City: {city}</p>
      <p>Participants: {participants.length}</p>
    </div>
  );
}
