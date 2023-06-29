import React, { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "60vh",
  height: "500px",
};

const center = {
  lat: 37.8,
  lng: -122.27
};

const CreateGame = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [skillLevelRequirement, setSkillLevelRequirement] = useState('');
  const [location, setLocation] = useState('');

  const handleSelect = async (address) => {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setLocation(address);

    // Fetch nearby fields
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location: { lat, lng },
      radius: 1000, // Adjust the radius as per your requirement
      type: "park",
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setNearbyFields(results);
      }
    });
  };

  const handleMarkerClick = (field) => {
    setSelectedField(field);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the selected location for game creation
    const newGame = {
      title,
      date,
      skillLevelRequirement,
      location,
    };

    // Perform the necessary logic for game creation
    console.log(newGame);
  };

  const renderMap = () => {
    return (
      <GoogleMap
        zoom={11}
        center={selected ? selected : center}
        mapContainerStyle={mapContainerStyle}
      >
        {selected && <Marker position={selected} />}
        {nearbyFields.map((field) => (
          <Marker
            key={field.place_id}
            position={{
              lat: field.geometry.location.lat(),
              lng: field.geometry.location.lng(),
            }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => handleMarkerClick(field)}
          />
        ))}
        {selectedField && (
          <InfoWindow
            position={{
              lat: selectedField.geometry.location.lat(),
              lng: selectedField.geometry.location.lng(),
            }}
            onCloseClick={() => setSelectedField(null)}
          >
            <div>
              <h2>{selectedField.name}</h2>
              <p>{selectedField.vicinity}</p>
              {selectedField.photos && selectedField.photos[0] && (
                <img
                  src={selectedField.photos[0].getUrl()}
                  alt={selectedField.name}
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const [nearbyFields, setNearbyFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <div className='Create-Game-Page'>
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
          <PlacesAutocomplete handleSelect={handleSelect} />
        </label>
        <br />
        <button type="submit">Create Game</button>
      </form>
      {isLoaded ? (
        <div>
          {renderMap()}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const PlacesAutocomplete = ({ handleSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default CreateGame;
