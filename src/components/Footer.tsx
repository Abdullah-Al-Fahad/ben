'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const footerSections = [
  {
    title: 'Address',
    content: '3711 Drennan Road, Colorado Springs, CO 80916',
    icon: <FaMapMarkerAlt />,
  },
  {
    title: 'Phones',
    content: '+1-719-465-2136',
    icon: <FaPhone />,
  },
  {
    title: 'Working Hours',
    content: 'Monday-Friday: 11:30 - 21:30, Saturday: 09:00 - 13:00',
    icon: <FaClock />,
  },
  {
    title: 'Email',
    content: 'info@cowarrior.com',
    icon: <FaEnvelope />,
  },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: <FaFacebookF /> },
  { name: 'Instagram', href: '#', icon: <FaInstagram /> },
];

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <footer className={`bg-[#0d0d0d] border-t border-gray-800 py-16 px-4 ${isAdminPage ? 'hidden' : ''}`}>
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f27_189493_custom_site_themes_id_Hvy2IjHPQMezsfKWPzM0_WFC%20Logo%20White%20on%20Red.png"
            alt="Warrior Fitness Center Logo"
            width={160}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Footer Info */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 text-gray-400">
          <div>
            <h4 className="font-bold text-white mb-2">WARRIOR FITNESS CENTER</h4>
            <p>3711 Drennan Road,<br />Colorado Springs, CO 80916</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">HOURS</h4>
            <p>M-F: 11:30 - 21:30<br />SAT: 09:00 - 13:00</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">CALL US</h4>
            <p>+1-719-465-2136</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" aria-label="Instagram"><FaInstagram className="text-3xl text-gray-500 hover:text-red-500 transition-colors" /></a>
          <a href="#" aria-label="Facebook"><FaFacebookF className="text-3xl text-gray-500 hover:text-red-500 transition-colors" /></a>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-600">&copy; 2025 Warrior Fitness Center. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
