import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaRss, FaGoogle, FaFlickr } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-6 md:gap-8 text-sm justify-between">
        {/* Logo + Slogan */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-2">
            <Image src="/assets/icons/logo.png" alt="logo" width={30} height={30} />
            <span className="font-bold text-lg">Momento</span>
          </Link>
          <p className="text-gray-400">Your Campus Event Companion</p>
        </div>


        {/* Services */}
        <div className="space-y-2 flex flex-col">
          <h4 className="font-semibold mb-2">Services</h4>
          <Link href="/volunteer" className="hover:text-orange-500">Volunteer</Link>
          <Link href="/organize" className="hover:text-orange-500">Host an Event</Link>
          <Link href="/support" className="hover:text-orange-500">Get Support</Link>
        </div>

        {/* About Section */}
        <div className="space-y-2 flex flex-col">
          <h4 className="font-semibold mb-2">About</h4>
          <Link href="/about" className="hover:text-orange-500">About Us</Link>
          <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          <Link href="/faq" className="hover:text-orange-500">FAQ</Link>
        </div>

        {/* Resources */}
        <div className="space-y-2 flex flex-col">
          <h4 className="font-semibold mb-2">Resources</h4>
          <Link href="/partners" className="hover:text-orange-500">Partners</Link>
          <Link href="/policy" className="hover:text-orange-500">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-orange-500">Terms of Service</Link>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-700"></div>

      {/* Social + Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm max-w-7xl mx-auto">
        {/* Social Icons */}
        <div className="flex gap-4 text-white">
          <Link href="#"><FaFacebookF className="hover:text-orange-500" /></Link>
          <Link href="#"><FaTwitter className="hover:text-orange-500" /></Link>
          <Link href="#"><FaRss className="hover:text-orange-500" /></Link>
          <Link href="#"><FaGoogle className="hover:text-orange-500" /></Link>
          <Link href="#"><FaFlickr className="hover:text-orange-500" /></Link>
        </div>

        {/* Copyright */}
        <p>© 2025 Momento. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
