'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../../components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '../../components/ui/separator';
import { DialogTitle } from '@radix-ui/react-dialog';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface NavItemsProps {
  user: User | null;
  onLogout: () => void;
}

function NavItems({ user, onLogout }: NavItemsProps) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.png"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-6 bg-white">
          <DialogTitle className="sr-only">
            Main Menu
          </DialogTitle>

          {/* Logo */}
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={60}
            height={38}
          />

          <Separator className="border border-gray-100" />

          {/* Logged In User Section */}
          {user && (
            <>
              <div className="px-3 flex flex-col gap-2">
                <p className="text-lg font-semibold text-gray-900">
                  Hi, {user.firstName}
                </p>

                <button
                  onClick={onLogout}
                  className="text-left text-red-500 font-medium"
                >
                  Logout
                </button>
              </div>

              <Separator className="border border-gray-100" />
            </>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-4 ml-3">
            <Link
              href="/"
              className="text-lg font-medium text-gray-800 hover:text-orange-500"
            >
              Home
            </Link>

            <Link
              href="/events"
              className="text-lg font-medium text-gray-800 hover:text-orange-500"
            >
              Events
            </Link>

            {user ? (
              <>
                <Link
                  href="/events/create"
                  className="text-lg font-medium text-gray-800 hover:text-orange-500"
                >
                  Create Events
                </Link>

                <Link
                  href="/profile"
                  className="text-lg font-medium text-gray-800 hover:text-orange-500"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-lg font-medium text-gray-800 hover:text-orange-500"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="text-lg font-medium text-gray-800 hover:text-orange-500"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link
              href="/about"
              className="text-lg font-medium text-gray-800 hover:text-orange-500"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-lg font-medium text-gray-800 hover:text-orange-500"
            >
              Contact
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default NavItems;