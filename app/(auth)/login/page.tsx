"use client";

import { useEffect, useState } from "react";
import {
  getUserSession,
  signInWithEmail,
  signInWithGoogle,
} from "@/utils/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserSession(); // Ambil session user dari server
      if (user) {
        router.push("/"); // Redirect ke dashboard jika user sudah login
      }
    };
    fetchUser();
  }, [router]);

  // 🔥 Mutation untuk proses login
  const loginMutation = useMutation({
    mutationFn: async () => signInWithEmail(email, password),
    onSuccess: () => {
      router.push("/"); // Redirect setelah login berhasil
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: signInWithGoogle,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    loginMutation.mutate();
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center">Please enter your details</p>

        {/* 🔥 Menampilkan error */}
        {loginMutation.isError && (
          <p className="text-red-500 text-center">
            Error: {(loginMutation.error as Error)?.message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-between text-sm">
            <Link href="/reset-password" className="text-blue-600">
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            disabled={loginMutation.isPending} // 🔥 Disable saat loading
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => googleLoginMutation.mutate()}
          disabled={googleLoginMutation.isPending}
        >
          {googleLoginMutation.isPending ? (
            "Signing in..."
          ) : (
            <>
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign in with Google
            </>
          )}
        </Button>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
