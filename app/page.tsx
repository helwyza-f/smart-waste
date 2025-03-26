"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, Trash2 } from "lucide-react";

const HomePage = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isiOS && !isInStandaloneMode) {
      setShowInstallPrompt(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      {/* Hero Section */}
      <section className="max-w-3xl text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Kelola Sampah dengan Cerdas
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Laporkan, kumpulkan, dan pantau lokasi sampah di sekitarmu. Bersama
          kita bisa menjaga lingkungan yang lebih bersih!
        </p>
      </section>

      {/* Fitur Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Lihat Peta Sampah */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <MapPin className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Lihat Peta Sampah
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Temukan lokasi sampah yang perlu dibersihkan dan bantu menyebarkan
            informasi.
          </p>
        </div>

        {/* Laporkan Sampah */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 text-red-600 rounded-full">
              <AlertCircle className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Laporkan Sampah
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Jika menemukan sampah yang belum terkelola, laporkan dengan mudah
            melalui aplikasi ini.
          </p>
        </div>

        {/* Kumpulkan Sampah */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 text-green-600 rounded-full">
              <Trash2 className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Kumpulkan Sampah
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Ikut serta dalam program pengumpulan sampah dan dapatkan reward atas
            kontribusimu.
          </p>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="mt-12 flex flex-col md:flex-row gap-4">
        <Link href="/maps">
          <Button className="w-60 md:w-auto bg-blue-600 text-white hover:bg-blue-700">
            🗺️ Lihat Peta Sampah
          </Button>
        </Link>
        <Link href="/laporkan-sampah">
          <Button className="w-60 md:w-auto bg-red-600 text-white hover:bg-red-700">
            📍 Laporkan Sampah
          </Button>
        </Link>
        <Link href="/kumpulkan-sampah">
          <Button className="w-60 md:w-auto bg-green-600 text-white hover:bg-green-700">
            🗑️ Kumpulkan Sampah
          </Button>
        </Link>
      </section>

      {/* Install Prompt untuk iOS */}
      {showInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg text-center mt-6">
          <p>
            Install aplikasi ini: Tekan{" "}
            <span className="font-bold">&quot;Share&quot;</span> lalu pilih{" "}
            <span className="font-bold">&quot;Add to Home Screen&quot;</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
