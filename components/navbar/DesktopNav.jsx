"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebarLinks } from "@/constants/links";
import Image from "next/image";
import ProfileDropdown from "../ProfileDropdown";

function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 right-0 w-screen z-50 grid grid-cols-[17%_78%] 
      lg:px-10 items-center backdrop-blur-md shadow-md h-20 pr-4"
    >
      <div className="gap-2 items-center pl-4">
        <Link href="/">
          <Image
            src="/logo/logoLight.png"
            alt="Logo"
            width={80}
            height={30}
            className="cursor-pointer"
            priority
          />
        </Link>
      </div>
      <div className="flex justify-end items-center gap-4">
        <div className="hidden lg:flex gap-4">
          {sidebarLinks.map((item) => {
            // if (item?.isProtected && !user) {
            //   return "";
            // } else {
            const isActive = pathname === item.route;
            return (
              <Link
                href={item.route}
                key={item.label}
                className={`flex gap-4 items-center p-4 rounded-lg relative 
                  after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary
                  after:transform after:scale-x-0 after:transition-transform after:duration-300
                  hover:after:scale-x-100
                  group ${isActive ? "after:scale-x-100" : ""}`}
              >
                <p className="font-semibold transition-all duration-300 group-hover:scale-110">
                  {item.label}
                </p>
              </Link>
            );
            // }
          })}
        </div>
        <ProfileDropdown />
      </div>
    </nav>
  );
}

export default DesktopNav;
