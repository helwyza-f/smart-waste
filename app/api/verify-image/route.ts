import { GoogleGenerativeAI } from "@google/generative-ai";

async function fetchBase64(imageUrl: string) {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  // 🔥 Hapus prefix sebelum dikirim ke Gemini
  return base64;
}

export async function POST(req: Request) {
  try {
    const { originalUrl, newImageUrl } = await req.json();

    // 🔥 Convert kedua gambar ke base64
    const originalBase64 = await fetchBase64(originalUrl);
    const newBase64 = await fetchBase64(newImageUrl);

    // 🔥 Inisialisasi Gemini
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 🔥 Prompt untuk membandingkan gambar
    const prompt = `Bandingkan dua gambar ini dan tentukan apakah kedua gambar tersebut sama atau mirip.  
    Jawab hanya dalam format JSON berikut dan jangan ada teks tambahan:
    {
      "match": true/false,
      "confidence": tingkat_kepercayaan (0-1)
    }`;

    // 🔥 Kirim ke Gemini
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: originalBase64, mimeType: "image/png" } },
      { inlineData: { data: newBase64, mimeType: "image/png" } },
    ]);

    // 🔥 Ambil hasil JSON
    const text = result.response.text();
    const cleanedText = text.replace(/```json|```/g, "").trim();
    console.log(cleanedText);
    return Response.json(JSON.parse(cleanedText));
  } catch (error) {
    console.error("Error verifying images:", error);
    return Response.json({ error: "Error processing images" }, { status: 500 });
  }
}
