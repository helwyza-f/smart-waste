"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { fetchReports } from "@/lib/fetchReports";

// 🔥 Import Leaflet secara dinamis agar tidak dieksekusi di server
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  const [reports, setReports] = useState<
    { id: number; location?: { lat: number; lng: number }; status: string }[]
  >([]);
  const [filterStatus, setFilterStatus] = useState("all"); // 🔥 Filter status
  const [selectedReports, setSelectedReports] = useState<typeof reports>([]); // 🔥 State untuk menyimpan data yang sesuai filter

  const [icons, setIcons] = useState<any>({});

  useEffect(() => {
    const loadReports = async () => {
      const data = await fetchReports();
      console.log("Fetched Reports:", data);
      setReports(data);
    };
    loadReports();
  }, []);

  useEffect(() => {
    import("leaflet").then((L) => {
      setIcons({
        pending: new L.Icon({
          iconUrl: "/trash.png",
          iconSize: [35, 35],
          iconAnchor: [17, 35],
          popupAnchor: [0, -35],
        }),
        completed: new L.Icon({
          iconUrl: "/check.png",
          iconSize: [20, 20],
          iconAnchor: [17, 35],
          popupAnchor: [0, -35],
        }),
        collected: new L.Icon({
          iconUrl: "/trash.png",
          iconSize: [35, 35],
          iconAnchor: [17, 35],
          popupAnchor: [0, -35],
        }),
        all: new L.Icon({
          iconUrl: "/marker.png",
          iconSize: [35, 35],
          iconAnchor: [17, 35],
          popupAnchor: [0, -35],
        }),
      });
    });
  }, []);

  const parseLocation = (
    locationStr: string | null
  ): { lat: number; lng: number } | null => {
    if (!locationStr) return null;
    const [lat, lng] = locationStr.split(",").map(Number);
    return isNaN(lat) || isNaN(lng) ? null : { lat, lng };
  };

  // 🔥 Update `selectedReports` setiap kali `filterStatus` atau `reports` berubah
  useEffect(() => {
    const filteredReports = reports
      .map((report) => {
        const location = parseLocation(report.location as unknown as string);
        return {
          id: report.id,
          location: location ?? undefined, // ✅ Convert null to undefined
          status: report.status,
        };
      })
      .filter(
        (report) =>
          report.location &&
          (filterStatus === "all" || report.status === filterStatus)
      );

    console.log("Filtered Reports:", filteredReports);
    setSelectedReports(filteredReports);
  }, [filterStatus, reports]);

  return (
    <div className="h-[550px] w-full">
      {/* 🔥 Dropdown Filter */}
      <div className="mb-4">
        <select
          className="p-2 border border-gray-300 rounded-md w-[200px]"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Semua</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="collected">Collected</option>
        </select>
      </div>

      <MapContainer
        center={
          selectedReports.length > 0
            ? selectedReports[0].location
            : { lat: 1.122187, lng: 104.053194 }
        }
        zoom={13}
        className="h-full w-full z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Object.keys(icons).length > 0 &&
          selectedReports.map((report) => (
            <Marker
              key={report.id}
              position={report.location!}
              icon={icons[report.status] || icons["all"]}
            >
              <Popup>
                ID: {report.id} | Status: {report.status}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
