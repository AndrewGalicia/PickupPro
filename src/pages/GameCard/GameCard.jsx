import React from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom';

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
     <Link to={`/games/${game._id}`}>
      <h3>{formattedDate} {formattedTime}</h3>  
      <h2>{title}</h2>
      <p>Skill Requirement: {skillLevelRequirement}</p>
      <footer className='Card-Footer'>
      <p>{city}</p>
      <p>Participants: {participants.length}</p>
      </footer>
    
      </Link>   
    </div>
  );
}
