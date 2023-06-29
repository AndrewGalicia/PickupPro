import React, { useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { createGame } from '../../utilities/games-api'


const CreateGame = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [skillLevelRequirement, setSkillLevelRequirement] = useState('');
  const [location, setLocation] = useState('');

  const handleSelect = async (address) => {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setLocation(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use the selected location for game creation
    const newGame = {
      title,
      date,
      skillLevelRequirement,
      location,
    };

    const handleAddGame = async (newGame) => {
        try {
          const createdGame = await createGame(newGame);
          console.log('Game created:', createdGame);
          // Handle successful game creation
        } catch (error) {
          console.error(error);
          // Handle error during game creation
        }
      };
    };


 


  return (
    <div>
      <h2>Create Game</h2>
      <form onSubmit={handleSubmit}>
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
        <label>
          Location:
          <PlacesAutocomplete handleSelect={handleSelect} setValue={setLocation} />
        </label>
        <br />
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
};

const PlacesAutocomplete = ({ handleSelect, setValue }) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue: setAutocompleteValue, // Rename the function to avoid conflicts
      clearSuggestions, // Function to clear suggestions
    } = usePlacesAutocomplete({
      debounce: 300,
    });
  
    const handleChange = (e) => {
      setValue(e.target.value);
      setAutocompleteValue(e.target.value); // Pass the value to the usePlacesAutocomplete hook
    };
  
    const handleClearSuggestions = () => {
      setValue(''); // Clear the input field value
      clearSuggestions(); // Clear the suggestions
    };

    const handleSelectSuggestion = (address) => {
        setValue(address); // Update the input value with the selected address
        handleSelect(address); // Call the parent component's handleSelect function
      };
    
  
    return (
      <Combobox onSelect={handleSelectSuggestion}>
        <ComboboxInput
          value={value}
          onChange={handleChange}
          disabled={!ready}
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };
export default CreateGame;
