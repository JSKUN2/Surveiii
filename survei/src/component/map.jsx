import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const lokasi = [
  { lat: -7.97, lng: 112.63},
  { lat: -7.96, lng: 112.64}
];

export default function Map() {
  return (
    <MapContainer
      center={[-7.9666, 112.6326]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {lokasi.map((p, i) => (
        <CircleMarker
          key={i}
          center={[p.lat, p.lng]}
          radius={5}
          pathOptions={{ color: "blue", fillColor: "blue" }}
        >
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
