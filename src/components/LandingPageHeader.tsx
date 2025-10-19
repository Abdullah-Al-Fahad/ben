'use client';
import Link from 'next/link';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { useState } from 'react';

const LandingPageHeader = () => {
  const [isDisciplinesOpen, setIsDisciplinesOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Top black bar */}
      <div className="bg-black text-white flex justify-center items-center py-2 px-6 text-xs sm:text-sm">
        <p>Warrior Fitness Center - 3711 Drennan Road, Colorado Springs, CO 80916</p>
        <p className="ml-4">+1-719-465-2136</p>
      </div>

      {/* Main header */}
      <header className="w-full bg-white">
        <div className="mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/">
              <img 
                src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0efd_fulllogowarrior.svg" 
                alt="Warrior Logo" 
                className="h-10" // Adjusted height to better match the image
              />
          </Link>

          <div className="flex h-full items-center">
            {/* Navigation Links */}
            <nav className="hidden h-full items-center md:flex space-x-7 text-black font-black uppercase tracking-widest text-sm mr-6 pt-8">
              <Link href="/ourgym" className="hover:text-red-600 transition-colors text-lg text-gray-600">Our Gym</Link>
              <Link href="#who-we-are" className="hover:text-red-600 transition-colors text-lg text-gray-600">Who We Are</Link>
              
              {/* Disciplines Dropdown */}
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsDisciplinesOpen(true)}
                onMouseLeave={() => setIsDisciplinesOpen(false)}
              >
                <Link 
                  href="#disciplines" 
                  className={`hover:text-red-600 transition-colors text-lg text-gray-600 ${isDisciplinesOpen ? 'text-red-600' : ''}`}
                >
                  Disciplines
                </Link>
                {isDisciplinesOpen && (
                  <div className="absolute top-full left-0 bg-red-600 text-white whitespace-nowrap">
                    <Link href="#" className="block px-5 py-3 hover:bg-white hover:text-red-600 border-b border-white transition-colors text-xl">The Art of Muay Thai</Link>
                    <Link href="#" className="block px-5 py-3 hover:bg-white hover:text-red-600 border-b border-white transition-colors text-xl">Brazilian Jiu Jitsu (BJJ)</Link>
                    <Link href="#" className="block px-5 py-3 hover:bg-white hover:text-red-600 border-b border-white transition-colors text-xl">Mixed Martial Arts (MMA)</Link>
                    <Link href="#" className="block px-5 py-3 hover:bg-white hover:text-red-600 border-b border-white transition-colors text-xl">Fitness</Link>
                  </div>
                )}
              </div>

              <Link href="/coaches" className="hover:text-red-600 transition-colors text-lg text-gray-600">Coaches</Link>
              <Link href="/schedule" className="hover:text-red-600 transition-colors text-lg text-gray-600">Schedule</Link>
              <Link href="/membership" className="hover:text-red-600 transition-colors text-lg text-gray-600">Pricing</Link>
              <Link href="#" className="hover:text-red-600 transition-colors text-lg text-gray-600">Shop</Link>
            </nav>

            {/* Social Icons */}
            <div className="flex h-full items-stretch">
              <a 
                href="#" 
                aria-label="Instagram" 
                className="bg-gray-300 flex items-center justify-center px-4 hover:bg-gray-400 transition-colors"
              >
                <FaInstagram className="h-5 w-5 text-white" />
              </a>
              <a 
                href="#" 
                aria-label="Facebook" 
                className="bg-gray-300 flex items-center justify-center px-4 hover:bg-gray-400 transition-colors"
              >
                <FaFacebookF className="h-5 w-5 text-white" />
              </a>
            </div>
            
            {/* Mobile Menu Button (Optional, for responsiveness) */}
            <div className="md:hidden ml-4">
               {/* You can add a hamburger icon/button here for mobile view */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPageHeader;