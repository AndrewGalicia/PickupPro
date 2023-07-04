import React, { useState } from 'react';
import { createGame } from '../../utilities/games-api';
// import { getUser } from '../../utilities/users-service';
import './CreateGame.css'
const CreateGame = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [skillLevelRequirement, setSkillLevelRequirement] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Use the selected location for game creation
    const newGame = {
      title,
      date,
      skillLevelRequirement,
      address,
      city,
    };

    try {
      const createdGame = await createGame(newGame);
      console.log('Game created:', createdGame);
      // Handle successful game creation
    } catch (error) {
      console.error(error);
      // Handle error during game creation
    }
  };

  return (
    <div className='Create-Game-Page'>
      <h2>Create Game</h2>
      <form className='create-game-form-container' onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          Skill Level Requirement:
          <select
            value={skillLevelRequirement}
            onChange={(e) => setSkillLevelRequirement(e.target.value)}
            required
          >
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="casual">Casual</option>
            <option value="expert">Expert</option>
            <option value="pro">Pro</option>
          </select>
        </label>
        <br />
        <button className='classic-button' type="submit">Create Game</button>
      </form>
    </div>
  );
};

export default CreateGame;
