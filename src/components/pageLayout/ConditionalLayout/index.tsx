"use client";

import { usePathname } from "next/navigation";
import { Menu } from "@/components/pageLayout/Menu";
import { Footer } from "@/components/pageLayout/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();

  // Don't show menu and footer in sanity or on homepage
  if (pathname && (pathname.startsWith("/sanity") || pathname === "/")) {
    return <>{children}</>;
  }

  return (
    <>
      <header>
        <Menu />
      </header>
      <div className="page">{children}</div>
      <Footer />
    </>
  );
};
