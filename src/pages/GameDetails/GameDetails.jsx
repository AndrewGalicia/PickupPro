import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as gamesAPI from '../../utilities/games-api';

export default function GameDetails({user}) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [map, setMap] = useState(null);
  const [isInstagramAdded, setIsInstagramAdded] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      try {
        const fetchedGame = await gamesAPI.getById(id);
        setGame(fetchedGame);
        setIsInstagramAdded(fetchedGame.participants.includes('user_instagram_account')); // Replace 'user_instagram_account' with the user's Instagram account value
      } catch (error) {
        console.error(error);
      }
    }

    fetchGame();
  }, [id]);

  const handleMapClick = () => {
    // Open Google Maps in a new tab
    window.open('https://maps.google.com', '_blank');
  };

  const handleToggleInstagram = () => {
    // Assuming you have a state for the user's Instagram account
    const userInstagramAccount = user.instagram;

    if (isInstagramAdded) {
      // Remove the user's Instagram account from the participant array
      const updatedParticipants = game.participants.filter(
        (participant) => participant !== userInstagramAccount
      );

      // Update the game object with the updated participants array
      const updatedGame = { ...game, participants: updatedParticipants };
      setGame(updatedGame);
    } else {
      // Add the user's Instagram account to the participant array
      const updatedGame = { ...game, participants: [...game.participants, userInstagramAccount] };
      setGame(updatedGame);
    }

    // Toggle the state of isInstagramAdded
    setIsInstagramAdded(!isInstagramAdded);
  };

  useEffect(() => {
    if (game) {
      // Initialize the map and marker when the game data is available
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
    <div>
      <h2>{title}</h2>
      <p>Date: {formattedDate} {formattedTime}</p>
      <p>Skill Level: {skillLevelRequirement}</p>
      <p>Address: {address}</p>
      <p>City: {city}</p>
      <p>Participants:</p>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            <a href={`https://www.instagram.com/${participant}/`}>{participant}</a>
          </li>
        ))}
      </ul>
      <button onClick={handleToggleInstagram}>
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
