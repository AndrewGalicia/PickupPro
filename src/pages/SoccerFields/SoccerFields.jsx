import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './SoccerFields.css'
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

export default function SoccerFields() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState(null);

  const handleSelect = async (address) => {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  const renderMap = () => {
    return (
      <GoogleMap
        zoom={12}
        center={selected ? selected : center}
        mapContainerStyle={mapContainerStyle}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <div className="Field-Page">
      <h1>Soccer Fields</h1>
      {isLoaded ? (
        <div className="places-container">
          <PlacesAutocomplete handleSelect={handleSelect} />
          {renderMap()}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

const PlacesAutocomplete = ({ handleSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
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
