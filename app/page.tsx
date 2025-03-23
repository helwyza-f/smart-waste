"use client";
import React, { useState, useEffect } from "react";

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Hello</h1>

      {showInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg text-center">
          <p>
            Install aplikasi ini: Tekan{" "}
            <span className="font-bold">"Share"</span> lalu pilih{" "}
            <span className="font-bold">"Add to Home Screen"</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
