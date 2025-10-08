'use client';
import React from 'react';
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
  return (
    <footer className="bg-neutral-950 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col items-center md:items-start">
              <div className="text-red-500 mb-4 text-2xl">{section.icon}</div>
              <h3 className="font-bold uppercase mb-2">{section.title}</h3>
              <p className="text-neutral-400 text-sm">{section.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Cowarrior Gym. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
