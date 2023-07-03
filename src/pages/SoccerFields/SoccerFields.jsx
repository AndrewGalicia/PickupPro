import { useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import './SoccerFields.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

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
  const [nearbyFields, setNearbyFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  const handleSelect = async (address) => {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });

    // Fetch nearby fields
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));
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

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <div className="Field-Page">
      <h1>Fields</h1>
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
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Search an address"
      />
      {status === "OK" && (
        <ul>
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
