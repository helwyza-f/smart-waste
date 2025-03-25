"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

import { Camera, UploadCloud, CheckCircle, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { useUser } from "@/context/userContext";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DynamicMap = dynamic(() => import("../../../components/DynamicMap"), {
  ssr: false,
});

const supabase = createClient();
export default function LaporkanSampah() {
  const user: User = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [useMap, setUseMap] = useState(false);
  const [wasteType, setWasteType] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setWasteType(null);
    setAmount(null);
    setConfidence(null);
    getLocation();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Gagal mendapatkan lokasi. Pastikan GPS aktif.");
        }
      );
    } else {
      alert("Geolocation tidak didukung di browser ini.");
    }
  };

  const convertToBase64 = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // 🔍 Verifikasi Gambar dengan Google Gen AI
  const verifyImageMutation = useMutation({
    mutationFn: async () => {
      if (!image) throw new Error("No image selected!");
      const base64Data = await convertToBase64(image);

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Analisis gambar ini dan berikan:  
          1. Jenis sampah (misalnya, plastik, kertas, kaca, logam, organik)  
          2. Perkiraan jumlah (dalam kg atau liter)  
          3. Tingkat kepercayaan (dalam persen)  

          Berikan respons dalam format JSON seperti ini dan hanya JSON nya saja tanpa ada tambahan teks apa pun:  
          {
            "wasteType": "jenis",
            "quantity": "jumlah",
            "confidence": tingkat_kepercayaan (0-1)
          }`;

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Data, mimeType: "image/png" } },
      ]);
      const text = result.response.text();
      const cleanedText = text.replace(/```json|```/g, "").trim();
      console.log(cleanedText);
      return JSON.parse(cleanedText);
    },
    onSuccess: (data) => {
      setWasteType(data.wasteType);
      setAmount(data.quantity);
      setConfidence(data.confidence);
    },
    onError: (error: Error) => {
      alert("Verifikasi gagal: " + error.message);
    },
  });

  const saveReportMutation = useMutation({
    mutationFn: async () => {
      if (!image || !location || !wasteType || !user)
        throw new Error("Data belum lengkap!");

      const filePath = `reports/${user.id}-${Date.now()}-${image.name}`;

      // Upload image ke Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("report-images")
        .upload(filePath, image);

      if (uploadError) throw uploadError;

      // Simpan laporan ke database dengan kolom location sebagai string "lat,lng"
      const { error: dbError } = await supabase.from("reports").insert([
        {
          user_id: user.id,
          image_url: uploadData.path,
          location: `${location.lat},${location.lng}`, // Perbaikan di sini
          waste_type: wasteType,
          amount: amount,
          status: "pending",
        },
      ]);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("Laporan berhasil dikirim!");
      setImage(null);
      setPreview(null);
      setWasteType(null);
      setAmount(null);
      setConfidence(null);
      setUseMap(false);
    },
    onError: (error: Error) => {
      toast.error("Laporan gagal dikirim: " + error.message);
    },
  });

  return (
    <div className="flex flex-col gap-4 p-4 items-center ">
      <h1 className="text-2xl font-bold">Laporkan Lokasi Sampah</h1>
      <label className="cursor-pointer flex flex-col  items-center justify-center w-44 h-44 bg-gray-100 rounded-lg shadow-md border border-dashed border-gray-400 hover:bg-gray-200">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
            width={144}
            height={144}
          />
        ) : (
          <Camera className="w-10 h-10 text-gray-500" />
        )}
      </label>
      <button
        onClick={() => verifyImageMutation.mutate()}
        disabled={verifyImageMutation.isPending || !image}
        className="p-2 bg-yellow-500 text-white rounded flex items-center gap-2 disabled:opacity-50 w-full max-w-md"
      >
        {verifyImageMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <CheckCircle />
        )}{" "}
        Verifikasi Gambar
      </button>
      {wasteType && (
        <div className="p-3 bg-gray-100 rounded-lg">
          <p>
            <strong>Jenis Sampah:</strong> {wasteType}
          </p>
          <p>
            <strong>Jumlah Estimasi:</strong> {amount}
          </p>
          <p>
            <strong>Kepercayaan AI:</strong> {(confidence! * 100).toFixed(2)}%
          </p>
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={getLocation}
          className="p-2 bg-blue-500 text-white rounded flex items-center gap-2"
        >
          <UploadCloud className="w-5 h-5" /> Gunakan Lokasi Saya
        </button>
        <button
          onClick={() => setUseMap(!useMap)}
          className="p-2 bg-green-500 text-white rounded"
        >
          Pilih di Peta 🗺️
        </button>
      </div>
      {useMap && (
        <div className="h-96 w-[90%] ">
          <DynamicMap location={location} setLocation={setLocation} />
        </div>
      )}
      {location && (
        <p>
          🌍 Lokasi: {location.lat}, {location.lng}
        </p>
      )}
      <button
        onClick={() => saveReportMutation.mutate()}
        disabled={saveReportMutation.isPending || !wasteType}
        className="p-2 bg-purple-500 text-white rounded disabled:opacity-50"
      >
        {saveReportMutation.isPending ? "Menyimpan..." : "Simpan Laporan"}
      </button>
    </div>
  );
}
