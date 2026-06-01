import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

export function Root() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <FloatingWhatsApp />
    </div>
  );
}
