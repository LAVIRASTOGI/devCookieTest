"use client";

import Link from "next/link";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";
import MobileNav from "./MobileNav";

function MobileNavigation() {
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
        <ProfileDropdown />
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MobileNavigation;
