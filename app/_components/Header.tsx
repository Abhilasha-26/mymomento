"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavItems from "./NavItems";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      setUser(null);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/20 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.png"
            alt="Momento Logo"
            width={40}
            height={40}
          />
          <span className="font-bold text-2xl text-white">
            Momento
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 font-medium">
          <Link href="/" className="text-white hover:text-orange-500">
            Home
          </Link>

          <Link href="/events" className="text-white hover:text-orange-500">
            Events
          </Link>

          {user && (
            <Link
              href="/profile"
              className="text-white hover:text-orange-500"
            >
              My Profile
            </Link>
          )}

          <Link href="/about" className="text-white hover:text-orange-500">
            About
          </Link>

          <Link href="/contact" className="text-white hover:text-orange-500">
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {!loading && (
            <>
              {user ? (
  <div className="hidden md:flex items-center gap-2">
    <span className="text-white font-medium">
      Hi, {user.firstName}
    </span>

    <Button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600"
    >
      Logout
    </Button>
  </div>
) : (
                <>
                  <Link href="/sign-in">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/sign-up">
                    <Button
                      variant="outline"
                      className="border-white text-white bg-amber-500 hover:bg-white hover:text-black"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}

          <NavItems user={user}
            onLogout={handleLogout}
/>
        </div>
      </div>
    </header>
  );
}