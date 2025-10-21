"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaBars, FaTimes } from "react-icons/fa";
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
  { name: "Who We Are", href: "/#who-we-are" },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Top black bar */}
      <div className="bg-black text-white flex flex-col sm:flex-row justify-center items-center py-2 px-4 sm:px-6 text-center text-xs sm:text-sm">
        <p>
          Warrior Fitness Center - 3711 Drennan Road, Colorado Springs, CO 80916
        </p>
        <p className="ml-0 sm:ml-4 mt-1 sm:mt-0">+1-719-465-2136</p>
      </div>

      {/* Main Header */}
      <header className="w-full bg-white relative">
        <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/">
            <Image
              src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0efd_fulllogowarrior.svg"
              alt="Warrior Logo"
              height={100}
              width={200}
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          <div className="flex h-full items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-7 font-black uppercase tracking-widest text-sm pt-8">
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
                        "text-base lg:text-lg transition-colors",
                        isActive
                          ? "text-red-600"
                          : "text-gray-600 hover:text-red-600"
                      )}
                    >
                      {item.name}
                    </Link>

                    {/* Dropdown */}
                    {item.dropdown && isDropdownOpen && (
                      <div className="absolute top-full left-0 bg-red-600 text-white whitespace-nowrap shadow-lg">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-5 py-3 hover:bg-white hover:text-red-600 border-b border-gray-500 transition-colors text-base lg:text-xl"
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

            {/* Desktop Social Icons */}
            <div className="hidden md:flex gap-2 h-full items-stretch ml-4 lg:ml-6">
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

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-red-600"
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="size-8" />
                ) : (
                  <FaBars className="size-8" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-white shadow-lg overflow-hidden"
        >
          <nav className="flex flex-col items-center space-y-6 py-8">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== "/");
              const isDropdownOpen = activeDropdown === item.name;

              return (
                <div key={item.name} className="text-center">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(isDropdownOpen ? null : item.name)
                        }
                        className={clsx(
                          "text-lg font-black uppercase tracking-widest transition-colors",
                          isActive ? "text-red-600" : "text-gray-600"
                        )}
                      >
                        {item.name}
                      </button>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mt-4 flex flex-col space-y-4 overflow-hidden"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="text-gray-600 hover:text-red-600"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={clsx(
                        "text-lg font-black uppercase tracking-widest transition-colors",
                        isActive
                          ? "text-red-600"
                          : "text-gray-600 hover:text-red-600"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
            {/* Mobile Social Icons */}
            <div className="flex gap-6 pt-4">
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center"
              >
                <FaInstagram className="size-7 text-gray-600" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex items-center justify-center"
              >
                <FaFacebook className="size-7 text-gray-600" />
              </a>
            </div>
          </nav>
        </motion.div>
      </header>
    </div>
  );
}