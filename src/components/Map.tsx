'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { LatLngExpression } from 'leaflet'

// --- PROP TYPES ---
// Define the shape of the marker data we expect from the Dashboard
interface MapMarker {
  id: number
  lat: number
  lng: number
  plant: string
  health: string
  pestDetected: boolean
  moisture: number
  type: 'crop' | 'rover'
}

// Define the props that this Map component will accept
interface MapProps {
  center: [number, number]
  zoom: number
  markers?: MapMarker[] // Markers are optional
  className?: string
}

// --- CUSTOM ICONS ---
// Create different icons for different marker types to match the dashboard's legend

const roverIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const healthyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const lowMoistureIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pestIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// Helper function to determine which icon to use
const getMarkerIcon = (marker: MapMarker) => {
  if (marker.type === 'rover') return roverIcon;
  if (marker.pestDetected) return pestIcon;
  if (marker.health === 'Low Moisture') return lowMoistureIcon;
  return healthyIcon;
};

// --- MAP COMPONENT ---
// This component now accepts props and is fully controlled by its parent.
const Map = ({ center, zoom, markers = [], className }: MapProps) => {

  // We no longer need internal state or useEffect for fetching data.
  // The component is now "presentational".

  if (typeof window === 'undefined') {
    return null; // Don't render on the server
  }
  
  return (
    <div className={className}>
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Loop through the markers array passed in via props */}
            {markers.map((marker) => (
                <Marker 
                    key={marker.id} 
                    position={[marker.lat, marker.lng]}
                    icon={getMarkerIcon(marker)}
                >
                    <Popup>
                        <b>{marker.plant}</b><br />
                        Status: {marker.health}<br />
                        Moisture: {marker.moisture}%
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </div>
  );
};

export default Map;