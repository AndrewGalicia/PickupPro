import { useMemo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import './Map.css'

export default function Map() {
    const center = useMemo(() => ({ lat: 37.77, lng: -122 }), []);

    return (
        <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
            <Marker position={center} />
        </GoogleMap>
    );
}