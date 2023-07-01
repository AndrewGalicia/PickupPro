import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as gamesAPI from '../../utilities/games-api';

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [map, setMap] = useState(null);

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
      <p>Participants: {participants.length}</p>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
}
