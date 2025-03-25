import MapComponent from "./MapComponent";

export default function MapsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Sebaran Titik Lokasi Sampah
      </h1>

      <MapComponent />
    </div>
  );
}
