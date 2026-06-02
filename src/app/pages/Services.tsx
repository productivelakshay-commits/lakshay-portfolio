import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, ExternalLink, Code2, Globe, Palette, Zap, Database, Smartphone, Shield, TrendingUp, MessageCircle } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { whatsappUrl } from "../lib/contact";

/* ─── Magnetic Button ─────────────────────────── */
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Service Card Expanded ───────────────────── */
const allServices = [
  {
    icon: Globe,
    title: "Landing Page Design",
    price: "$299",
    delivery: "3 days",
    desc: "High-converting single-page websites with stunning animations that drive action.",
    features: ["Hero animations", "Scroll effects", "Mobile responsive", "SEO optimized"],
    gradient: "from-violet-600 to-purple-600",
    glow: "rgba(124,58,237,0.3)",
    popular: false,
  },
  {
    icon: Palette,
    title: "Full Website Design",
    price: "$799",
    delivery: "7 days",
    desc: "Complete multi-page websites with cohesive design language and fluid animations.",
    features: ["5-10 pages", "Custom animations", "CMS integration", "Performance optimized"],
    gradient: "from-fuchsia-600 to-pink-600",
    glow: "rgba(236,72,153,0.3)",
    popular: true,
  },
  {
    icon: Zap,
    title: "Motion Overhaul",
    price: "$499",
    delivery: "5 days",
    desc: "Transform your existing website with premium animations and micro-interactions.",
    features: ["Page transitions", "Scroll animations", "Hover effects", "Loading screens"],
    gradient: "from-cyan-600 to-blue-600",
    glow: "rgba(6,182,212,0.3)",
    popular: false,
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    price: "$549",
    delivery: "5 days",
    desc: "Touch-optimized experiences with buttery-smooth animations for mobile users.",
    features: ["Touch gestures", "PWA ready", "App-like feel", "Fast loading"],
    gradient: "from-emerald-600 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
    popular: false,
  },
  {
    icon: Code2,
    title: "React Development",
    price: "$999",
    delivery: "10 days",
    desc: "Production-ready React apps with TypeScript, state management, and animations.",
    features: ["TypeScript", "Testing suite", "CI/CD setup", "Documentation"],
    gradient: "from-orange-600 to-red-600",
    glow: "rgba(234,88,12,0.3)",
    popular: false,
  },
  {
    icon: TrendingUp,
    title: "Brand Website",
    price: "$1,299",
    delivery: "14 days",
    desc: "Premium brand websites that tell your story with cinematic motion design.",
    features: ["Brand identity", "Custom illustrations", "3D elements", "Video integration"],
    gradient: "from-yellow-600 to-orange-600",
    glow: "rgba(234,179,8,0.3)",
    popular: false,
  },
];

/* ─── Portfolio items ─────────────────────────── */
const portfolio: { title: string; cat: string; img: string }[] = [
  { title: "MERIDIAN", cat: "AI Tool", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWFTJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzJTIwZGFyayUyMFVJJTIwYXBwfGVufDF8fHx8MTc3ODc2NzkwNnww&ixlib=rb-4.1.0&q=80&w=1080" },
];

/* ─── Tech Stack ──────────────────────────────── */
const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Tailwind", color: "#38bdf8" },
  { name: "Framer", color: "#bb4fff" },
  { name: "Figma", color: "#f24e1e" },
  { name: "Node.js", color: "#68a063" },
  { name: "Vercel", color: "#ffffff" },
];

/* ─── Process Steps ───────────────────────────── */
const steps = [
  { n: "01", title: "Discovery Call", desc: "We discuss your goals, target audience, and vision for the project." },
  { n: "02", title: "Design Concept", desc: "I craft wireframes and design mockups for your approval." },
  { n: "03", title: "Animation Magic", desc: "Bringing life to the design with fluid, purposeful animations." },
  { n: "04", title: "Delivery & Support", desc: "Clean code handoff, deployment help, and 30-day free support." },
];

/* ─── Floating Orb ────────────────────────────── */
function FOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(90px)", opacity: 0.25 }}
      animate={{ y: [-15, 15, -15], x: [-8, 8, -8] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "AI Tool"];
  const filtered = selectedCat === "All" ? portfolio : portfolio.filter((p) => p.cat === selectedCat);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#1a0533_0%,_#050510_60%)]" />
          <FOrb x="60%" y="10%" size={400} color="radial-gradient(circle, #7c3aed, transparent)" delay={0} />
          <FOrb x="0%" y="50%" size={300} color="radial-gradient(circle, #ec4899, transparent)" delay={2} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
          >
            <Palette size={14} className="text-violet-400" />
            <span className="text-violet-300" style={{ fontSize: "0.85rem" }}>Services & Portfolio</span>
          </motion.div>

          {/* Stagger headline letters */}
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            {["Premium", " ", "Web", " ", "Experiences"].map((word, i) => (
              <motion.span
                key={i}
                className={word.trim() ? "inline-block mr-[0.2em]" : ""}
                initial={{ y: 60, opacity: 0, rotateX: -60 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === 2 ? (
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{word}</span>
                ) : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white/50 max-w-2xl mx-auto mt-6"
            style={{ fontSize: "1.1rem", lineHeight: 1.7 }}
          >
            Packages crafted for ambitious brands, startups, and businesses that refuse to be ordinary.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, i) => {
              const Icon = service.icon;
              const isHovered = hoveredCard === i;
              return (
                <AnimatedSection key={i} delay={i * 0.08} direction="up">
                  <motion.div
                    className="relative p-8 rounded-3xl border bg-white/3 cursor-pointer overflow-hidden h-full"
                    style={{ borderColor: isHovered ? service.glow : "rgba(255,255,255,0.08)" }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setHoveredCard(i)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    {/* Glow bg */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow}, transparent 70%)` }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Popular badge */}
                    {service.popular && (
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-white"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)", fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        Most Popular
                      </motion.div>
                    )}

                    <div className="relative z-10">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg`}
                        animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon size={24} className="text-white" />
                      </motion.div>

                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white" style={{ fontSize: "1.2rem", fontWeight: 700 }}>{service.title}</h3>
                        <div className="text-right">
                          <div className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent" style={{ fontSize: "1.4rem", fontWeight: 800 }}>{service.price}</div>
                          <div className="text-white/30" style={{ fontSize: "0.75rem" }}>in {service.delivery}</div>
                        </div>
                      </div>

                      <p className="text-white/50 mb-5" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>{service.desc}</p>

                      <ul className="space-y-2 mb-6">
                        {service.features.map((f, fi) => (
                          <motion.li
                            key={fi}
                            className="flex items-center gap-2 text-white/60"
                            style={{ fontSize: "0.85rem" }}
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + fi * 0.07 }}
                          >
                            <motion.span
                              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r shrink-0"
                              style={{ background: `linear-gradient(to right, ${service.glow}, ${service.glow})` }}
                              animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
                              transition={{ delay: fi * 0.1, duration: 0.4 }}
                            />
                            {f}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex gap-2">
                        <motion.a
                          href={whatsappUrl(`Hi Motion Studio team, I'm interested in your "${service.title}" package (${service.price}, ${service.delivery}).`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${service.gradient} text-white cursor-pointer flex items-center justify-center gap-2`}
                          style={{ fontSize: "0.9rem", fontWeight: 600 }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <MessageCircle size={14} className="fill-white" />
                          Get Started
                        </motion.a>
                        <Link to="/contact">
                          <motion.button
                            className="py-3 px-4 rounded-xl border border-white/15 text-white/70 cursor-pointer flex items-center justify-center"
                            style={{ fontSize: "0.85rem", backgroundColor: "rgba(255,255,255,0.04)" }}
                            whileHover={{ scale: 1.03, color: "white", borderColor: "rgba(255,255,255,0.3)" }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <ArrowRight size={14} />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#0d0520_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection className="text-center mb-12">
            <span className="text-violet-400 tracking-widest uppercase mb-3 block" style={{ fontSize: "0.8rem" }}>Portfolio</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Recent <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Work</span>
            </h2>
          </AnimatedSection>

          {/* Filter tabs */}
          <AnimatedSection className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                className="px-4 py-2 rounded-full cursor-pointer transition-colors"
                style={{
                  background: selectedCat === cat ? "linear-gradient(135deg, #7c3aed, #ec4899)" : "rgba(255,255,255,0.05)",
                  color: selectedCat === cat ? "white" : "rgba(255,255,255,0.4)",
                  border: "1px solid",
                  borderColor: selectedCat === cat ? "transparent" : "rgba(255,255,255,0.1)",
                  fontSize: "0.85rem",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </motion.button>
            ))}
          </AnimatedSection>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence mode="sync">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Link to="/work" className="block group relative rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-violet-300" style={{ fontSize: "0.75rem" }}>{item.cat}</p>
                        <h3 className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{item.title}</h3>
                      </div>
                      <motion.div
                        className="w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center opacity-0 group-hover:opacity-100"
                        style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}
                        whileHover={{ scale: 1.15, backgroundColor: "rgba(139,92,246,0.4)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink size={16} className="text-white" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-violet-400 tracking-widest uppercase mb-3 block" style={{ fontSize: "0.8rem" }}>How It Works</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Simple <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Process</span>
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Connecting line */}
            <motion.div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/50 via-fuchsia-600/50 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ originY: 0 }}
            />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <AnimatedSection key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="flex-1 hidden md:block" />
                    {/* Node */}
                    <motion.div
                      className="relative shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30 z-10"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
                    >
                      <span className="text-white" style={{ fontWeight: 800, fontSize: "0.9rem" }}>{step.n}</span>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-violet-400/50"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      />
                    </motion.div>
                    {/* Content */}
                    <div className={`flex-1 p-6 rounded-2xl bg-white/3 border border-white/8 ${i % 2 === 0 ? "" : "md:text-right"}`}>
                      <h3 className="text-white mb-2" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{step.title}</h3>
                      <p className="text-white/50" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection className="mb-12">
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Built With <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">The Best Tools</span>
            </h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <AnimatedSection key={tech.name} delay={i * 0.06} direction="scale">
                <MagneticButton>
                  <motion.div
                    className="px-6 py-3 rounded-full border border-white/10 cursor-pointer"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileHover={{ borderColor: tech.color, backgroundColor: `${tech.color}15`, scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span style={{ color: tech.color, fontSize: "0.9rem", fontWeight: 600 }}>{tech.name}</span>
                  </motion.div>
                </MagneticButton>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection direction="scale">
            <motion.div
              className="p-12 rounded-3xl bg-gradient-to-br from-violet-900/40 to-fuchsia-900/20 border border-violet-500/20"
              whileHover={{ boxShadow: "0 0 80px rgba(124,58,237,0.2)" }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl mb-6 inline-block"
              >🚀</motion.div>
              <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                Like What You See?
              </h2>
              <p className="text-white/50 mb-8" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                Let's turn your vision into a stunning reality. Book a free discovery call today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <MagneticButton className="inline-block">
                  <Link to="/contact">
                    <motion.button
                      className="flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-500/30 cursor-pointer"
                      style={{ fontSize: "1rem", fontWeight: 600 }}
                      whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(139,92,246,0.5)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Start a Project
                      <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                </MagneticButton>
                <motion.a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25d366] text-white shadow-xl shadow-[#25d366]/30 cursor-pointer"
                  style={{ fontSize: "1rem", fontWeight: 600 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37,211,102,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle size={16} className="fill-white text-[#25d366]" />
                  WhatsApp
                </motion.a>
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