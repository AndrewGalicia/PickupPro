import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import Map from '../../components/Map/Map'
import './SoccerFields.css';


export default function SoccerField() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
    <div className="FieldPage">
      <h1>Soccer Fields</h1>
      <Map />
    </div>
  )
}


