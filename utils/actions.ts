"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function signUpWithEmail(
  full_name: string,
  email: string,
  password: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name, username: full_name } },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://smart-waste.helwiza.com/auth/callback`,
    },
  });

  if (error) return { error: error.message };

  redirect(data.url); // Redirect ke Google login page
}

export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  return data.user;
}

export async function resetPassword(email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function updatePassword(password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    throw new Error(error.message);
  }
  return { success: true };
}
