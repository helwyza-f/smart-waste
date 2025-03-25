"use client";

import imageCompression from "browser-image-compression";

/**
 * Mengompres gambar sebelum diunggah
 * @param {File} file - File gambar yang akan dikompres
 * @param {number} maxSizeMB - Maksimal ukuran file dalam MB (default 0.5MB)
 * @param {number} maxWidthOrHeight - Maksimal lebar atau tinggi gambar (default 800px)
 * @returns {Promise<File>} - File gambar yang sudah dikompres
 */
export const compressImage = async (
  file: File,
  maxSizeMB: number = 0.5,
  maxWidthOrHeight: number = 800
): Promise<File> => {
  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true, // Gunakan Web Worker untuk performa lebih baik
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Image compression error:", error);
    return file; // Jika gagal, kembalikan file asli
  }
};
