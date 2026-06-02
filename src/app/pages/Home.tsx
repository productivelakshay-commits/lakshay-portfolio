import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, Sparkles, Globe, Palette, Code2, Zap, ChevronDown, MousePointer2, MessageCircle } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { whatsappUrl } from "../lib/contact";

/* ─── Floating Orbs ──────────────────────────── */
function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(80px)", opacity: 0.35 }}
      animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.1, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Particle ───────────────────────────────── */
function Particle({ i }: { i: number }) {
  const x = `${Math.random() * 100}%`;
  const y = `${Math.random() * 100}%`;
  const size = Math.random() * 3 + 1;
  return (
    <motion.div
      key={i}
      className="absolute rounded-full bg-violet-400"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
    />
  );
}

/* ─── Marquee Strip ──────────────────────────── */
const skills = ["React", "Next.js", "Motion Design", "Tailwind CSS", "Framer Motion", "TypeScript", "UI/UX Design", "Web Animation", "3D Design", "Figma"];

function MarqueeStrip() {
  const doubled = [...skills, ...skills];
  return (
    <div className="overflow-hidden py-4 border-y border-white/5">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((s, i) => (
          <span key={i} className="flex items-center gap-2 text-white/40 shrink-0" style={{ fontSize: "0.9rem" }}>
            <Sparkles size={12} className="text-violet-500" />
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── 3D Tilt Card ───────────────────────────── */
function TiltCard({ icon: Icon, title, desc, gradient }: { icon: any; title: string; desc: string; gradient: string }) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 10;
    const y = -(e.clientX - rect.left - rect.width / 2) / 10;
    setRot({ x, y });
  };

  return (
    <motion.div
      className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX: hovered ? rot.x : 0, rotateY: hovered ? rot.y : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.03 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setRot({ x: 0, y: 0 }); }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 rounded-2xl"
        style={{ background: gradient }}
        animate={{ opacity: hovered ? 0.12 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: gradient }}
        animate={{ rotate: hovered ? 10 : 0, scale: hovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon size={22} className="text-white" />
      </motion.div>
      <h3 className="text-white mb-2" style={{ fontSize: "1.1rem", fontWeight: 600 }}>{title}</h3>
      <p className="text-white/50" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{desc}</p>
    </motion.div>
  );
}

const services = [
  { icon: Globe, title: "Web Design", desc: "Pixel-perfect websites that captivate and convert visitors.", gradient: "linear-gradient(135deg, #7c3aed, #a855f7)" },
  { icon: Palette, title: "Motion Design", desc: "Fluid animations that breathe life into every interaction.", gradient: "linear-gradient(135deg, #ec4899, #f97316)" },
  { icon: Code2, title: "Development", desc: "Clean, scalable code built with modern frameworks.", gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
  { icon: Zap, title: "Performance", desc: "Lightning-fast websites optimized for every device.", gradient: "linear-gradient(135deg, #10b981, #84cc16)" },
];

/* ─── Word Reveal ────────────────────────────── */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Main Page ──────────────────────────────── */
export function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const springY = useSpring(heroY, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {/* Gradient mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a0533_0%,_#050510_60%)]" />
          {/* Orbs */}
          <FloatingOrb x="10%" y="20%" size={400} color="radial-gradient(circle, #7c3aed, transparent)" delay={0} />
          <FloatingOrb x="70%" y="10%" size={300} color="radial-gradient(circle, #ec4899, transparent)" delay={2} />
          <FloatingOrb x="80%" y="60%" size={350} color="radial-gradient(circle, #3b82f6, transparent)" delay={1} />
          <FloatingOrb x="5%" y="70%" size={250} color="radial-gradient(circle, #06b6d4, transparent)" delay={3} />
          {/* Particles */}
          {Array.from({ length: 40 }).map((_, i) => <Particle key={i} i={i} />)}
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ y: springY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-violet-300" style={{ fontSize: "0.85rem" }}>Available for Freelance Work</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              <WordReveal text="I Build Websites" />
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                <WordReveal text="That Move" />
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/50 max-w-2xl mx-auto mb-10"
            style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", lineHeight: 1.7 }}
          >
            Premium animated landing pages and AI-powered websites for Indian D2C brands and startups. Built with React, Motion, and Tailwind.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/work">
              <motion.button
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-500/30 cursor-pointer"
                style={{ fontSize: "1rem", fontWeight: 600 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(139,92,246,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>
            </Link>
            <motion.a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full border border-[#25d366]/30 text-white cursor-pointer"
              style={{ fontSize: "1rem", backgroundColor: "rgba(37,211,102,0.08)" }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(37,211,102,0.18)", borderColor: "rgba(37,211,102,0.6)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle size={15} className="fill-white text-[#25d366]" />
              </motion.div>
              Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}>SCROLL</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mouse follower glow */}
        <MouseGlow />
      </section>

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── RECENT PROJECTS HEADING ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-violet-400 tracking-widest uppercase mb-3 block" style={{ fontSize: "0.8rem" }}>Portfolio</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Recent <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mt-4" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              A small, curated set of recent work. Each project is hand-crafted with motion and care.
            </p>
            <Link to="/work">
              <motion.button
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-violet-500/30 cursor-pointer"
                style={{ fontSize: "0.95rem", fontWeight: 600 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                See Recent Work
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0d0520_0%,_transparent_70%)]" />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection className="text-center mb-16">
            <span className="text-violet-400 tracking-widest uppercase mb-3 block" style={{ fontSize: "0.8rem" }}>What I Do</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Services That <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Deliver Results</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1} direction="up">
                <TiltCard {...s} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOWCASE IMAGE ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection direction="scale">
            <motion.div
              className="relative rounded-3xl overflow-hidden border border-white/10"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1651241678859-96f075bf6780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjB3b3Jrc3BhY2UlMjBjcmVhdGl2ZSUyMGRlc2lnbmVyJTIwcG9ydGZvbGlvfGVufDF8fHx8MTc3ODQ5NzQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Creative workspace"
                loading="lazy"
                className="w-full h-[400px] md:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="flex flex-wrap gap-3"
                >
                  {["React", "Next.js", "Motion", "Figma", "TypeScript"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08, type: "spring" }}
                      className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-sm"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute top-6 right-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl px-4 py-2 shadow-xl"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <MousePointer2 size={14} className="text-white" />
                  <span className="text-white" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Live Preview</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="scale">
            <motion.div
              className="relative rounded-3xl overflow-hidden p-12 text-center"
              style={{ background: "linear-gradient(135deg, #1a0533, #0a0a2e, #0d1a3a)" }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899, #3b82f6, #7c3aed)", backgroundSize: "300% 300%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-[1px] rounded-3xl bg-[#0a0520]" />
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-5xl mb-6 inline-block"
                >
                  ✨
                </motion.div>
                <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  Ready to Build Something <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Amazing?</span>
                </h2>
                <p className="text-white/50 mb-8 max-w-xl mx-auto" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                  Let's create a website that makes your competitors jealous and your customers convert.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/contact">
                    <motion.button
                      className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-500/30 cursor-pointer"
                      style={{ fontSize: "1.05rem", fontWeight: 600 }}
                      whileHover={{ scale: 1.07, boxShadow: "0 0 60px rgba(139,92,246,0.6)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Start Your Project
                      <ArrowRight size={20} />
                    </motion.button>
                  </Link>
                  <motion.a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#25d366] text-white shadow-2xl shadow-[#25d366]/30 cursor-pointer"
                    style={{ fontSize: "1.05rem", fontWeight: 600 }}
                    whileHover={{ scale: 1.07, boxShadow: "0 0 60px rgba(37,211,102,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MessageCircle size={18} className="fill-white text-[#25d366]" />
                    WhatsApp Now
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-white/30" style={{ fontSize: "0.85rem" }}>
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <img src="/logo-sm.png" alt="" width={20} height={20} className="w-5 h-5 rounded-md" />
          © {new Date().getFullYear()} Motion Studio · Built with React, Motion & Tailwind
        </p>
      </footer>
    </motion.div>
  );
}

/* ─── Mouse Glow ─────────────────────────────── */
function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <motion.div
      className="pointer-events-none fixed z-0 rounded-full"
      style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", left: pos.x - 200, top: pos.y - 200 }}
      animate={{ left: pos.x - 200, top: pos.y - 200 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    />
  );
}