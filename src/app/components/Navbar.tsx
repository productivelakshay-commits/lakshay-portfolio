import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { whatsappUrl } from "../lib/contact";

const links = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/work", label: "Work" },
  { path: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050510]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.img
              src="/logo-sm.png"
              alt="Motion Studio logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl shadow-lg shadow-violet-500/30"
              whileHover={{ rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            />
            <span
              className="text-white hidden sm:inline"
              style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Motion<span className="text-violet-400"> Studio</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <motion.div
                  className="relative px-4 py-2 rounded-full cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                    style={{ fontSize: "0.95rem" }}
                  >
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <motion.a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25d366] text-white shadow-lg shadow-[#25d366]/30 cursor-pointer"
            style={{ fontSize: "0.88rem", fontWeight: 600 }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(37,211,102,0.5)" }}
            whileTap={{ scale: 0.96 }}
            aria-label="Message on WhatsApp"
          >
            <MessageCircle size={15} className="fill-white text-[#25d366]" />
            WhatsApp
          </motion.a>
          <Link to="/contact">
            <motion.button
              className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 cursor-pointer"
              style={{ fontSize: "0.9rem" }}
              whileHover={{ scale: 1.06, boxShadow: "0 0 30px rgba(139,92,246,0.5)" }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Me
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#050510]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl transition-colors ${
                      location.pathname === link.path
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.21 }}
              >
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="w-full mt-2 py-3 rounded-xl bg-[#25d366] text-white flex items-center justify-center gap-2">
                    <MessageCircle size={16} className="fill-white text-[#25d366]" />
                    WhatsApp Me
                  </button>
                </a>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.28 }}
              >
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  <button className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
                    Hire Me
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
