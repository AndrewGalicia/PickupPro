import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as gamesAPI from '../../utilities/games-api';
import './GameDetails.css'

export default function GameDetails({ user }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [map, setMap] = useState(null);
  const [isInstagramAdded, setIsInstagramAdded] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      try {
        const fetchedGame = await gamesAPI.getById(id);
        setGame(fetchedGame);
        setIsInstagramAdded(fetchedGame.participants.includes(user.instagram));
      } catch (error) {
        console.error(error);
      }
    }
    fetchGame();
  }, [id, user.instagram]);

  const handleMapClick = () => {
    window.open('https://maps.google.com', '_blank');
  };

  const handleToggleInstagram = async () => {
    const userInstagramAccount = user.instagram;
    let updatedGame;
  
    if (isInstagramAdded) {
      const updatedParticipants = game.participants.filter(
        (participant) => participant !== userInstagramAccount
      );
  
      updatedGame = { ...game, participants: updatedParticipants };
    } else {
      updatedGame = { ...game, participants: [...game.participants, userInstagramAccount] };
    }
  
    setIsInstagramAdded(!isInstagramAdded);
  
    try {
      // Call the updateGame API function to update the game data in the backend
      await gamesAPI.updateGame(game._id, updatedGame);
      setGame(updatedGame); // Update the game state after successful API call
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    if (game) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: game.address + ', ' + game.city }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;

          const mapOptions = {
            center: { lat: lat(), lng: lng() },
            zoom: 12,
          };

          const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
          const marker = new window.google.maps.Marker({
            position: { lat: lat(), lng: lng() },
            map,
          });
          setMap(map);
          console.log('Map:', map);
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }
  }, [game]);

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
    <div className='Game-Details-Page'>
      <h1>{title}</h1>
      <p>Date: {formattedDate} {formattedTime}</p>
      <p>Skill Level: {skillLevelRequirement}</p>
      <p>Address: {address}, {city}</p>
      <p>Participants:</p>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            <a href={`https://www.instagram.com/${participant}/`}>@{participant}</a>
          </li>
        ))}
      </ul>
      <button className='classic-button' onClick={handleToggleInstagram}>
        {isInstagramAdded ? 'Remove Instagram Account' : 'Add Instagram Account'}
      </button>
      <div
        id="map"
        style={{ height: '400px', width: '100%' }}
        onClick={handleMapClick}
      >
        Click here to view on Google Maps
      </div>
    </div>
  );
}
