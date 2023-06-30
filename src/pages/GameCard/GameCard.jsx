import React from 'react';
import './GameCard.css'

export default function GameCard({ game }) {
  const { title, date, skillLevelRequirement, location, participants } = game;

  return (
    <div className="GameCard">
      <h2>{title}</h2>
      <p>Date: {date}</p>
      <p>Skill Level: {skillLevelRequirement}</p>
      <p>Location: {location}</p>
      <p>Participants: {participants.join(', ')}</p>
    </div>
  );
}
