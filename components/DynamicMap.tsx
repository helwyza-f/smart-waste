"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Location } from "../app/laporkan-sampah/types";

// 🔥 Custom Icon untuk Marker
const customIcon = new L.Icon({
  iconUrl: "/marker.png", // Ganti dengan path ikon yang diinginkan
  iconSize: [35, 35], // Ukuran ikon
  iconAnchor: [17, 35], // Posisi anchor ikon
  popupAnchor: [0, -35], // Posisi popup relatif ke ikon
});

export default function DynamicMap({
  location,
  setLocation,
}: {
  location: Location | null;
  setLocation: (loc: Location) => void;
}) {
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={location || { lat: -6.1754, lng: 106.8272 }}
      zoom={13}
      className="h-full w-full z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      {location && <Marker position={location} icon={customIcon} />}
    </MapContainer>
  );
}
