import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../lib/contact";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Lakshay on WhatsApp"
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-full bg-[#25d366] text-white shadow-2xl"
      style={{ boxShadow: "0 8px 32px rgba(37,211,102,0.45)" }}
      initial={{ scale: 0, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(37,211,102,0.7)" }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      >
        <MessageCircle size={20} className="fill-white text-[#25d366]" />
      </motion.div>
      <span className="hidden sm:inline" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
        WhatsApp
      </span>
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "#25d366" }}
        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.a>
  );
}
