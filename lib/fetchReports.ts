import { createClient } from "@supabase/supabase-js";

// 🔥 Inisialisasi Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 🔄 Fungsi Ambil Data Laporan Sampah
export const fetchReports = async () => {
  const { data, error } = await supabase
    .from("reports")
    .select("id, location, status");

  if (error) {
    console.error("Error fetching reports:", error);
    return [];
  }

  return data || [];
};
