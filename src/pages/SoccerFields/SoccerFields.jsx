import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
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
  const [nearbyParks, setNearbyParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);

  const handleSelect = async (address) => {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });

    // Fetch nearby parks with the keyword "soccer field"
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location: { lat, lng },
      radius: 1000, // Adjust the radius as per your requirement
      keyword: "soccer field",
      type: "park",
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setNearbyParks(results);
      }
    });
  };

  const handleMarkerClick = (park) => {
    setSelectedPark(park);
  };

  const renderMap = () => {
    return (
      <GoogleMap
        zoom={12}
        center={selected ? selected : center}
        mapContainerStyle={mapContainerStyle}
      >
        {selected && <Marker position={selected} />}
        {nearbyParks.map((park) => (
          <Marker
            key={park.place_id}
            position={{
              lat: park.geometry.location.lat(),
              lng: park.geometry.location.lng(),
            }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => handleMarkerClick(park)}
          />
        ))}
        {selectedPark && (
        <InfoWindow
        position={{
          lat: selectedPark.geometry.location.lat(),
          lng: selectedPark.geometry.location.lng(),
        }}
        onCloseClick={() => setSelectedPark(null)}
      >
        <div>
          <h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedPark.geometry.location.lat()},${selectedPark.geometry.location.lng()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedPark.name}
            </a>
          </h2>
          <p>{selectedPark.vicinity}</p>
          {selectedPark.photos && selectedPark.photos[0] && (
            <img
              src={selectedPark.photos[0].getUrl()}
              alt={selectedPark.name}
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>
      </InfoWindow>
      
        )}
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
