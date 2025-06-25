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

function NavItems() {
  return (
    <div className="md:hidden"> {/* Hidden on md and up */}
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
          {/* Logo */}
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={70}
            height={38}
          />

          <Separator className="border border-gray-100" />

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-lg font-medium text-gray-800 hover:text-orange-500">
              Home
            </Link>
            <Link href="/events/create" className="text-lg font-medium text-gray-800 hover:text-orange-500">
              Create Events
            </Link>
            <Link href="/profile" className="text-lg font-medium text-gray-800 hover:text-orange-500">
              My Profile
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default NavItems;
