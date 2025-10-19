"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";
interface NavItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: "Our Gym", href: "/ourgym" },
  { name: "Who We Are", href: "#who-we-are" },
  {
    name: "Disciplines",
    href: "#disciplines",
    dropdown: [
      { name: "The Art of Muay Thai", href: "/disciplines/mua-thai" },
      { name: "Brazilian Jiu Jitsu (BJJ)", href: "/disciplines/jutsu" },
      { name: "Mixed Martial Arts (MMA)", href: "/disciplines/mua-thai" },
      { name: "Fitness", href: "/disciplines/fitness" },
    ],
  },
  { name: "Coaches", href: "/coaches" },
  { name: "Schedule", href: "/schedule" },
  { name: "Pricing", href: "/membership" },
  { name: "Shop", href: "https://warforgedapparel.com/" },
];

export default function LandingPageHeader() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="sticky top-0 z-50">
      {/* Top black bar */}
      <div className="bg-black text-white flex justify-center items-center py-2 px-6 text-xs sm:text-sm">
        <p>
          Warrior Fitness Center - 3711 Drennan Road, Colorado Springs, CO 80916
        </p>
        <p className="ml-4">+1-719-465-2136</p>
      </div>

      {/* Main Header */}
      <header className="w-full bg-white">
        <div className="mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/">
            <Image
              src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0efd_fulllogowarrior.svg"
              alt="Warrior Logo"
              height={100}
              width={200}
              className="h-10"
            />
          </Link>

          <div className="flex h-full items-center">
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-7 font-black uppercase tracking-widest text-sm pt-8">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href) && item.href !== "/");

                const isDropdownOpen = activeDropdown === item.name;

                return (
                  <div
                    key={item.name}
                    className="relative h-full flex items-center"
                    onMouseEnter={() =>
                      item.dropdown && setActiveDropdown(item.name)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={clsx(
                        "text-lg transition-colors",
                        isActive
                          ? "text-red-600"
                          : "text-gray-600 hover:text-red-600"
                      )}
                    >
                      {item.name}
                    </Link>

                    {/* Dropdown */}
                    {item.dropdown && isDropdownOpen && (
                      <div className="absolute top-full left-0 bg-red-600 text-white whitespace-nowrap">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-5 py-3 hover:bg-white hover:text-red-600 border-b border-white transition-colors text-xl"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Social Icons */}
            <div className="flex gap-2 h-full items-stretch ml-6">
              <motion.a
                href="#"
                aria-label="Instagram"
                className="bg-gray-400 flex items-center justify-center px-3"
                whileHover={{
                  backgroundColor: "#dc2626",
                  height: "6rem",
                }}
                transition={{ duration: 0.15 }}
              >
                <FaInstagram className="size-7 text-white mt-6" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Facebook"
                className="bg-gray-400 flex items-center justify-center px-3"
                whileHover={{
                  backgroundColor: "#dc2626",
                  height: "6rem",
                }}
                transition={{ duration: 0.15 }}
              >
                <FaFacebook className="size-7 text-white mt-6" />
              </motion.a>
            </div>

            {/* Mobile Menu Button (future enhancement) */}
            <div className="md:hidden ml-4">
              {/* Placeholder for hamburger icon */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
