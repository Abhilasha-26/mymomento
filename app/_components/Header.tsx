"use client"
import { Button } from '../../components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavItems from './NavItems';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/20 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={40}
            height={40}
          />
          <span className="font-bold text-2xl text-white">Momento</span>
        </Link>

        {/* Middle: Navigation */}
        <nav className="hidden md:flex gap-8 font-medium">
          <a href="/" className="text-white hover:text-orange-500 transition">Home</a>
          <a href="/events" className="text-white hover:text-orange-500 transition">Events</a>
          <a href="/testimonials" className="text-white hover:text-orange-500 transition">Testimonials</a>
          <a href="/about" className="text-white hover:text-orange-500 transition">About</a>
          <a href="/contact" className="text-white hover:text-orange-500 transition">Contact</a>
        </nav>

        {/* Right: Sign In */}
        <div className="ml-4 flex gap-2">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href={'/sign-in'}>
              <Button className="bg-orange-500 border-2 text-white hover:bg-orange-700 hover:text-black">
                Sign In
              </Button>
            </Link>
          )}
          <NavItems />
        </div>
      </div>
    </header>
  );
}

export default Header;
