"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
  router.push("/");
}
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center mb-4">
            <span className="text-white font-bold">⚡</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Create your account
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Free forever. No credit card needed.
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="First name"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm"
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />

              <input
                placeholder="Last name"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm"
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
            </div>

            {/* Username */}
            <input
              placeholder="Username"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm pr-10"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button
                type="button"
                className="absolute right-3 top-2 text-zinc-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400 text-white py-2 rounded-lg font-medium"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-600">
              already have an account?
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* FIXED LINK (IMPORTANT) */}
          <Link href="/sign-in">
            <div className="w-full text-center text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg py-2 cursor-pointer">
              Sign in
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-600 mt-5">
          By creating an account you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}