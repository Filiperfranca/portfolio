"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const FloatingParticles = dynamic(() => import("@/components/FloatingParticles"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <FloatingParticles />
      <Navbar />
      {children}
    </>
  );
}
