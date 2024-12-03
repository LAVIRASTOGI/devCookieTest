"use client";
import useScreenSize from "@/utils/useScreenSize";
import MobileNavigation from "./MobileNavigation";
import DesktopNav from "./DesktopNav";

// Usage in component
export default function NavBar() {
  const isMobile = useScreenSize();

  return <>{isMobile ? <MobileNavigation /> : <DesktopNav />}</>;
}
