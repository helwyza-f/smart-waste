"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { CheckCircle, MapPin, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Location } from "../laporkan-sampah/types";

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
  ssr: false,
});

const supabase = createClient();

type Report = {
  id: string;
  user_id: string;
  location: string;
  image_url: string;
  waste_type: string;
  amount: string;
  status: string;
}; // Ambil tipe dari Supabase

export default function KumpulkanSampah() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const queryClient = useQueryClient();

  const { data: reports, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("status", "pending");
      if (error) throw error;
      return data;
    },
  });

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("report-verifications") // 🔥 Folder baru untuk verifikasi
      .upload(fileName, file);

    setIsUploading(false);

    if (error) throw error;

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/report-verifications/${fileName}`;
  };

  const handleConfirm = async () => {
    if (!selectedReport || !imageFile) return;

    try {
      // 1️⃣ Upload gambar pengguna ke Supabase Storage
      const newImageUrl = await uploadImage(imageFile);

      // 2️⃣ Ambil URL gambar asli dari laporan
      const originalUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/report-images/${selectedReport.image_url}`;

      // 3️⃣ Kirim ke API untuk verifikasi
      const response = await fetch("/api/verify-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl, newImageUrl }),
      });

      const result = await response.json();
      console.log(result);

      // 4️⃣ Jika cocok, update status laporan ke "completed"
      if (result.match) {
        await supabase
          .from("reports")
          .update({ status: "completed" })
          .eq("id", selectedReport.id);
        toast.success("Sampah berhasil dikonfirmasi!");
        setSelectedReport(null);
        setShowVerificationModal(false);
        queryClient.invalidateQueries({ queryKey: ["reports"] });
      } else {
        toast.error("Gambar tidak cocok! Silakan unggah ulang.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat verifikasi.");
    }
  };

  function parseLocation(location: string | null): Location {
    if (!location) return { lat: 1.122, lng: 104.053 };
    const [lat, lng] = location.split(",").map(Number);
    return { lat, lng };
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Kumpulkan Sampah</h1>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports?.map((report) => (
            <div key={report.id} className="border p-4 rounded-lg shadow">
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/report-images/${report.image_url}`}
                alt="Laporan Sampah"
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-sm mt-2 text-gray-600">
                Jenis:{" "}
                <span className="font-semibold">{report.waste_type}</span>
              </p>
              <p className="text-sm text-gray-600">
                Jumlah: <span className="font-semibold">{report.amount}</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Lokasi: {report.location}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setSelectedReport(report);
                    setShowMap(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Lihat Peta
                </button>
                <button
                  onClick={() => {
                    setSelectedReport(report);
                    setShowVerificationModal(true);
                  }}
                  className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Selesai
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedReport && showMap && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 p-4 sm:p-0">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Lokasi Sampah
            </h2>
            <div className="h-[300px] w-full">
              <DynamicMap
                location={parseLocation(selectedReport.location)}
                setLocation={() => {}}
              />
            </div>
            <button
              onClick={() => setSelectedReport(null)}
              className="w-full py-2 mt-3 text-center text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              ✖ Tutup
            </button>
          </div>
        </div>
      )}

      {showVerificationModal && selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold text-center">
              Verifikasi Sampah
            </h2>

            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
              disabled={isUploading || !imageFile}
            >
              {isUploading || isVerifying ? "Memverifikasi..." : "Konfirmasi"}
            </button>

            <button
              onClick={() => {
                setShowVerificationModal(false);
                setSelectedReport(null);
              }}
              className="w-full py-2 mt-2 text-center text-red-600 hover:underline"
            >
              ✖ Batalkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
