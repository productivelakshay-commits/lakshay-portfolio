import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageSquare, Send, CheckCircle2, Clock, ArrowRight, ChevronDown, Copy, Check } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappUrl } from "../lib/contact";

const WHATSAPP_URL = whatsappUrl();
import { AnimatedSection } from "../components/AnimatedSection";

/* ─── Orb ─────────────────────────────────────── */
function Orb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(100px)", opacity: 0.2 }}
      animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Animated Input ──────────────────────────── */
function AnimInput({
  label, type = "text", placeholder, value, onChange, name,
}: {
  label: string; type?: string; placeholder: string; value: string; onChange: (v: string) => void; name: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div className="relative" animate={{ y: focused ? -2 : 0 }} transition={{ duration: 0.2 }}>
      <motion.label
        className="block mb-2 text-white/60"
        animate={{ color: focused ? "rgba(167,139,250,1)" : "rgba(255,255,255,0.4)" }}
        style={{ fontSize: "0.85rem", fontWeight: 500 }}
      >
        {label}
      </motion.label>
      <motion.div
        className="relative"
        animate={{ boxShadow: focused ? "0 0 0 1px rgba(139,92,246,0.5), 0 0 20px rgba(139,92,246,0.15)" : "0 0 0 1px rgba(255,255,255,0.08)" }}
        style={{ borderRadius: 12 }}
      >
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-white/20 outline-none transition-colors"
          style={{ fontSize: "0.95rem" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Animated Textarea ───────────────────────── */
function AnimTextarea({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div className="relative" animate={{ y: focused ? -2 : 0 }} transition={{ duration: 0.2 }}>
      <motion.label
        className="block mb-2"
        animate={{ color: focused ? "rgba(167,139,250,1)" : "rgba(255,255,255,0.4)" }}
        style={{ fontSize: "0.85rem", fontWeight: 500 }}
      >
        {label}
      </motion.label>
      <motion.div
        animate={{ boxShadow: focused ? "0 0 0 1px rgba(139,92,246,0.5), 0 0 20px rgba(139,92,246,0.15)" : "0 0 0 1px rgba(255,255,255,0.08)" }}
        style={{ borderRadius: 12 }}
      >
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-white/20 outline-none resize-none"
          style={{ fontSize: "0.95rem" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── FAQ Item ────────────────────────────────── */
function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border rounded-2xl overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      whileHover={{ borderColor: "rgba(139,92,246,0.25)" }}
    >
      <motion.button
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
      >
        <span className="text-white pr-4" style={{ fontSize: "0.95rem", fontWeight: 600 }}>{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 text-violet-400"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-white/50" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const faqs = [
  { q: "How long does a project typically take?", a: "Timelines vary by scope. A landing page takes 3–5 days, a full website 7–14 days. Rush delivery is available for an additional fee." },
  { q: "Do you offer revisions?", a: "Yes! All packages include unlimited revisions until you're 100% satisfied. Your happiness is my priority." },
  { q: "What information do you need to get started?", a: "A brief about your business, brand guidelines (if any), content/copy, and your goals. I'll guide you through everything on our discovery call." },
  { q: "Do you work with international clients?", a: "Absolutely. I'm based in Delhi but work with clients worldwide across all timezones. Communication is handled via WhatsApp, email, or your preferred platform." },
  { q: "Can you redesign my existing website?", a: "Yes! Website redesigns and motion overhauls are one of my specialties. I'll preserve your brand while elevating the experience." },
];

const socialLinks = [
  { icon: "📧", label: "Email", handle: CONTACT_EMAIL, color: "#a78bfa", href: `mailto:${CONTACT_EMAIL}` },
  { icon: "💬", label: "WhatsApp", handle: WHATSAPP_DISPLAY, color: "#25d366", href: WHATSAPP_URL },
];

/* ─── Email Card ──────────────────────────────── */
function EmailCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="p-6 rounded-3xl border"
      style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.06))", borderColor: "rgba(139,92,246,0.3)" }}
      whileHover={{ borderColor: "rgba(139,92,246,0.55)", y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mail size={18} className="text-white" />
        </motion.div>
        <div>
          <p className="text-white" style={{ fontSize: "0.95rem", fontWeight: 700 }}>Direct Email</p>
          <p className="text-violet-300" style={{ fontSize: "0.75rem" }}>Fastest way to reach me</p>
        </div>
      </div>

      <div
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl mb-4"
        style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span className="text-white/80 truncate" style={{ fontSize: "0.85rem" }}>{CONTACT_EMAIL}</span>
        <motion.button
          onClick={handleCopy}
          className="shrink-0 p-1.5 rounded-lg cursor-pointer"
          style={{ backgroundColor: "rgba(139,92,246,0.15)", color: "rgba(167,139,250,1)" }}
          whileHover={{ backgroundColor: "rgba(139,92,246,0.3)", scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Copy email"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Check size={14} />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Copy size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <motion.a
        href={`mailto:${CONTACT_EMAIL}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white"
        style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", fontSize: "0.88rem", fontWeight: 600 }}
        whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(139,92,246,0.4)" }}
        whileTap={{ scale: 0.97 }}
      >
        <Mail size={15} /> Send Email Directly
      </motion.a>
    </motion.div>
  );
}

/* ─── Success Screen ──────────────────────────── */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="flex flex-col items-center justify-center text-center py-16 gap-6"
    >
      {/* Checkmark */}
      <motion.div
        className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 18 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <CheckCircle2 size={44} className="text-white" />
        </motion.div>
      </motion.div>
      {/* Confetti rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border border-green-500/30"
          style={{ width: ring * 120, height: ring * 120, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ delay: 0.3 + ring * 0.15, duration: 1, ease: "easeOut" }}
        />
      ))}
      <div>
        <h3 className="text-white mb-2" style={{ fontSize: "1.8rem", fontWeight: 800 }}>Message Sent! 🎉</h3>
        <p className="text-white/50" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
          Thanks for reaching out! I'll get back to you within 24 hours.
        </p>
      </div>
      <motion.button
        onClick={onReset}
        className="px-6 py-3 rounded-xl border border-white/10 text-white/60 cursor-pointer"
        style={{ fontSize: "0.9rem", backgroundColor: "rgba(255,255,255,0.05)" }}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
      >
        Send Another Message
      </motion.button>
    </motion.div>
  );
}

/* ─── Main Page ───────────────────────────────── */
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    const subject = encodeURIComponent(`Project Inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service || "Not specified"}\nBudget: ${form.budget || "Not specified"}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    setSubmitting(false);
    setSubmitted(true);
  };

  const services = ["Landing Page Design", "Full Website Design", "Motion Overhaul", "Mobile-First Design", "React Development", "Brand Website", "Other"];
  const budgets = ["$200 – $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000+"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden text-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a0533_0%,_#050510_70%)]" />
          <Orb x="20%" y="0%" size={500} color="radial-gradient(circle, #7c3aed, transparent)" delay={0} />
          <Orb x="60%" y="30%" size={300} color="radial-gradient(circle, #06b6d4, transparent)" delay={2} />
          <Orb x="80%" y="60%" size={350} color="radial-gradient(circle, #ec4899, transparent)" delay={1} />
        </div>
        <div className="relative max-w-3xl mx-auto">
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 items-center justify-center mb-8 shadow-2xl shadow-violet-500/40"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail size={36} className="text-white" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Let's Build <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/50 mt-6"
            style={{ fontSize: "1.1rem", lineHeight: 1.7 }}
          >
            Ready to elevate your digital presence? Fill in the form or reach out directly. We respond within 24 hours.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-white/35 mt-3"
            style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
          >
            FOUNDER · LAKSHAY KUMAR · DELHI, INDIA
          </motion.p>

          {/* Response time badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <Clock size={13} className="text-green-400" />
            <span className="text-green-300" style={{ fontSize: "0.82rem" }}>Avg. response: under 4 hours</span>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ── FORM ── */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="left">
                <motion.div
                  className="p-8 rounded-3xl border"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                  whileHover={{ borderColor: "rgba(139,92,246,0.2)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <MessageSquare size={18} className="text-white" />
                    </motion.div>
                    <h2 className="text-white" style={{ fontSize: "1.3rem", fontWeight: 700 }}>Tell Me About Your Project</h2>
                  </div>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <SuccessState onReset={() => { setSubmitted(false); setForm({ name: "", email: "", service: "", budget: "", message: "" }); }} />
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <AnimInput label="Full Name" placeholder="John Smith" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                          <AnimInput label="Email Address" type="email" placeholder="john@company.com" name="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                        </div>

                        {/* Service select */}
                        <motion.div>
                          <label className="block mb-2 text-white/40" style={{ fontSize: "0.85rem", fontWeight: 500 }}>Service Needed</label>
                          <div className="flex flex-wrap gap-2">
                            {services.map((s) => (
                              <motion.button
                                key={s}
                                type="button"
                                onClick={() => setForm({ ...form, service: s })}
                                className="px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all"
                                style={{
                                  background: form.service === s ? "linear-gradient(135deg, #7c3aed, #ec4899)" : "rgba(255,255,255,0.05)",
                                  color: form.service === s ? "white" : "rgba(255,255,255,0.4)",
                                  border: "1px solid",
                                  borderColor: form.service === s ? "transparent" : "rgba(255,255,255,0.1)",
                                  fontSize: "0.8rem",
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                              >
                                {s}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>

                        {/* Budget */}
                        <motion.div>
                          <label className="block mb-2 text-white/40" style={{ fontSize: "0.85rem", fontWeight: 500 }}>Budget Range</label>
                          <div className="flex flex-wrap gap-2">
                            {budgets.map((b) => (
                              <motion.button
                                key={b}
                                type="button"
                                onClick={() => setForm({ ...form, budget: b })}
                                className="px-4 py-2 rounded-xl cursor-pointer"
                                style={{
                                  background: form.budget === b ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.04)",
                                  color: form.budget === b ? "rgba(167,139,250,1)" : "rgba(255,255,255,0.35)",
                                  border: "1px solid",
                                  borderColor: form.budget === b ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)",
                                  fontSize: "0.82rem",
                                }}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                {b}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>

                        <AnimTextarea label="Project Details" placeholder="Tell me about your project, goals, and timeline..." value={form.message} onChange={(v) => setForm({ ...form, message: v })} />

                        <motion.button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70"
                          style={{ fontSize: "1rem", fontWeight: 600 }}
                          whileHover={!submitting ? { scale: 1.02, boxShadow: "0 0 40px rgba(139,92,246,0.4)" } : {}}
                          whileTap={!submitting ? { scale: 0.98 } : {}}
                        >
                          <AnimatePresence mode="wait">
                            {submitting ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-3"
                              >
                                <motion.div
                                  className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                />
                                Sending...
                              </motion.div>
                            ) : (
                              <motion.div
                                key="send"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-3"
                              >
                                <Send size={18} />
                                Send Message
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatedSection>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick stats */}
              <AnimatedSection direction="right" delay={0.1}>
                <div className="p-6 rounded-3xl bg-white/3 border border-white/8 space-y-4">
                  <h3 className="text-white" style={{ fontSize: "1rem", fontWeight: 700 }}>Why Work With Me?</h3>
                  {[
                    { icon: "⚡", label: "Fast Delivery", value: "3–14 Days" },
                    { icon: "🔄", label: "Free Revisions", value: "Unlimited" },
                    { icon: "🇮🇳", label: "Based in", value: "Delhi, India" },
                    { icon: "💬", label: "Talk on", value: "WhatsApp" },
                    { icon: "🎨", label: "Built with", value: "React + Motion" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-white/50" style={{ fontSize: "0.9rem" }}>{item.label}</span>
                      </div>
                      <span className="text-white" style={{ fontSize: "0.9rem", fontWeight: 600 }}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Email card */}
              <AnimatedSection direction="right" delay={0.15}>
                <EmailCard />
              </AnimatedSection>

              {/* WhatsApp card */}
              <AnimatedSection direction="right" delay={0.2}>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 rounded-3xl border border-[#25d366]/30 bg-[#25d366]/5 cursor-pointer"
                  whileHover={{ borderColor: "rgba(37,211,102,0.5)", backgroundColor: "rgba(37,211,102,0.08)", y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-white" style={{ fontSize: "0.95rem", fontWeight: 700 }}>Message Me on WhatsApp</p>
                      <p className="text-[#25d366]" style={{ fontSize: "0.8rem" }}>{WHATSAPP_DISPLAY}</p>
                    </div>
                  </div>
                  <p className="text-white/50 mb-4" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                    Fastest way to reach me. I usually reply within a few hours.
                  </p>
                  <div className="flex items-center gap-2 text-[#25d366]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    <span>Open WhatsApp</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.a>
              </AnimatedSection>

              {/* Social links */}
              <AnimatedSection direction="right" delay={0.3}>
                <div className="p-6 rounded-3xl bg-white/3 border border-white/8">
                  <h3 className="text-white mb-4" style={{ fontSize: "1rem", fontWeight: 700 }}>Connect With Me</h3>
                  <div className="space-y-3">
                    {socialLinks.map((s, i) => (
                      <motion.a
                        key={s.label}
                        href={s.href}
                        className="flex items-center justify-between py-2 px-3 rounded-xl cursor-pointer"
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", x: 4 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{s.icon}</span>
                          <div>
                            <p className="text-white" style={{ fontSize: "0.88rem", fontWeight: 600 }}>{s.label}</p>
                            <p style={{ fontSize: "0.76rem", color: s.color }}>{s.handle}</p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-white/20" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-violet-400 tracking-widest uppercase mb-3 block" style={{ fontSize: "0.8rem" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Common <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Questions</span>
            </h2>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="scale">
            <motion.div
              className="relative overflow-hidden rounded-3xl text-center p-16"
              style={{ background: "linear-gradient(135deg, #0d0520 0%, #0a0a2e 50%, #0d1a3a 100%)" }}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl p-px overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "conic-gradient(from 0deg, #7c3aed, #ec4899, #3b82f6, #06b6d4, #7c3aed)", filter: "blur(2px)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-[1px] rounded-3xl bg-[#0a0520]" />
              </div>

              {/* Floating emojis */}
              {["🚀", "✨", "💎", "🎨", "⚡"].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl pointer-events-none"
                  style={{ left: `${10 + i * 20}%`, top: `${20 + (i % 2) * 60}%` }}
                  animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                >
                  {emoji}
                </motion.div>
              ))}

              <div className="relative z-10">
                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-white mb-4"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
                >
                  Your Dream Website is <br />
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    One Click Away
                  </span>
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-white/50 mb-10 max-w-xl mx-auto"
                  style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
                >
                  Premium animated landing pages and AI-powered websites for Indian D2C brands and startups. Let's build something that converts.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25d366] text-white shadow-xl shadow-[#25d366]/30 cursor-pointer"
                    style={{ fontSize: "1rem", fontWeight: 600 }}
                    whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(37,211,102,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    💬 Message on WhatsApp
                    <ArrowRight size={18} />
                  </motion.a>
                  <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white cursor-pointer"
                    style={{ fontSize: "1rem", backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send Project Brief
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/5 text-center text-white/30" style={{ fontSize: "0.85rem" }}>
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <img src="/logo-sm.png" alt="" width={20} height={20} className="w-5 h-5 rounded-md" />
          © {new Date().getFullYear()} Motion Studio · Built with React, Motion & Tailwind
        </p>
      </footer>
    </motion.div>
  );
}