'use client'

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbarKeyword = ['dashboard'];
  const shouldHideNavbar =  hideNavbarKeyword.some(keyword => pathname.includes(keyword));;

  if (shouldHideNavbar) return null;

  return <Navbar />;
}
