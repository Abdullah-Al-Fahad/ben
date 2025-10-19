"use client"
import { usePathname } from "next/navigation";
import LandingPageHeader from "./LandingPageHeader";

const ConditionalHeader = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return isAdminRoute ? null : <LandingPageHeader />;
};

export default ConditionalHeader;