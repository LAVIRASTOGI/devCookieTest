"use client";

import { sidebarLinks } from "@/constants/links";
import { useUser } from "@/contexts/userContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      <div className="drawer">
        <input
          id="mobile-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={toggleNav}
        />

        {/* Hamburger Button */}
        <div className="drawer-content">
          <label
            htmlFor="mobile-drawer"
            className="btn btn-ghost p-2 hover:bg-transparent"
          >
            <Image
              src="/icons/hamburger.svg"
              width={32}
              height={32}
              alt="Menu"
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
            />
          </label>
        </div>

        {/* Sidebar Overlay */}
        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-drawer"
            className="drawer-overlay bg-black/50"
            onClick={toggleNav}
          ></label>

          {/* Sidebar Content */}
          <div className="menu w-80 min-h-screen bg-white shadow-xl p-0">
            {/* Header Section with Logo and Close Button */}
            <div className="p-6 flex justify-between items-center">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/logo/logoLight.png"
                  alt="DevReady Academy"
                  width={80}
                  height={40}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  priority
                />
              </Link>

              {/* Close Button */}
              <button
                onClick={toggleNav}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 hover:text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Divider Line */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Navigation Links */}
            <div className="p-4 space-y-2">
              {sidebarLinks.map((item) => {
                // if (item?.isProtected && !user) {
                //   return "";
                // } else {
                const isActive = pathname.includes(item.route);
                return (
                  <Link
                    href={item.route}
                    key={item.label}
                    onClick={toggleNav}
                    className={`
                        flex items-center px-4 py-3 rounded-xl transition-all duration-300
                        ${
                          isActive
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                        }
                      `}
                  >
                    {/* Icon if you have one */}
                    {item.icon && (
                      <span className="mr-3">
                        <Image
                          src={item.icon}
                          width={20}
                          height={20}
                          alt={item.label}
                          className={isActive ? "text-white" : "text-gray-500"}
                        />
                      </span>
                    )}

                    {/* Label */}
                    <span
                      className={`font-medium ${
                        isActive ? "font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
                // }
              })}
            </div>

            {/* Bottom Section - Optional */}
            <div className="mt-auto p-6">
              <div className="h-px bg-gray-200 mb-6" />
              <div className="flex flex-col gap-4">
                <Link
                  href="/help"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Need Help?
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
