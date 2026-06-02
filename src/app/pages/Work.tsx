import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, ExternalLink, Sparkles, ChevronDown, X, Globe, Smartphone, ShoppingCart, Zap, Github, MonitorPlay, Database, Brain, MessageCircle } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LabGrid } from "../components/lab/LabGrid";
import { whatsappUrl } from "../lib/contact";

/* ─── Types ──────────────────────────────────── */
type Category = "All" | "SaaS" | "AI Tools" | "Mobile" | "E-Commerce" | "Brand";

interface Project {
  id: number;
  title: string;
  tagline: string;
  category: Category;
  tags: string[];
  image: string;
  color: string;
  gradient: string;
  metric: string;
  metricLabel: string;
  year: string;
  desc: string;
  features: string[];
  liveUrl: string;
  githubUrl: string;
  status: "Live" | "Open Source" | "Case Study";
}

/* ─── Data ───────────────────────────────────── */
const projects: Project[] = [
  {
    id: 1,
    title: "MERIDIAN",
    tagline: "AI Financial Intelligence for Indian Lenders",
    category: "AI Tools",
    tags: ["React", "TypeScript", "Tailwind", "Motion"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWFTJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzJTIwZGFyayUyMFVJJTIwYXBwfGVufDF8fHx8MTc3ODc2NzkwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed, #a855f7)",
    metric: "Live",
    metricLabel: "Concept Demo",
    year: "2026",
    desc: "An AI-powered financial intelligence platform purpose-built for Indian lenders to streamline credit analysis, risk scoring, and borrower insights. Premium B2B fintech experience — visual design, motion, and tier system.",
    features: ["AI-assisted credit analysis", "Borrower risk scoring", "Indian-market data context", "Tier-based lender workflow", "Built with React + Motion"],
    liveUrl: "https://meridian-demo-mu.vercel.app",
    githubUrl: "",
    status: "Live",
  },
  {
    id: 7,
    title: "MERIDIAN · Founder Preview",
    tagline: "Interactive 10% of the MERIDIAN engine",
    category: "AI Tools",
    tags: ["React", "TypeScript", "Tailwind", "Motion"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    color: "#d4a574",
    gradient: "linear-gradient(135deg, #d4a574, #8b6f47)",
    metric: "10%",
    metricLabel: "Live Preview",
    year: "2026",
    desc: "An invite-only, email-gated slice of MERIDIAN's borrower risk lens. Compose a borrower file, get an AI-style synthesis with a Prime/Near-Prime/Sub-Prime/Hold rating, a factor decomposition, and three lender actions. Same scoring logic that powers the full product.",
    features: ["Email-gated unlock", "4 sample Indian borrower profiles", "Composite 5-factor risk score", "Plain-English synthesis", "Lender action recommendations"],
    liveUrl: "https://meridian-preview.vercel.app",
    githubUrl: "https://github.com/productivelakshay-commits/motion-studio-meridian-preview",
    status: "Live",
  },
  {
    id: 2,
    title: "Lume Glow IQ",
    tagline: "AI Skincare Consultant Quiz",
    category: "AI Tools",
    tags: ["React", "Vite", "Tailwind", "Motion"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    color: "#C97B5F",
    gradient: "linear-gradient(135deg, #E8B8A0, #C97B5F)",
    metric: "5 Qs",
    metricLabel: "Personalized Routine",
    year: "2026",
    desc: "A 5-question quiz that builds a personalised skincare routine in under 60 seconds. Mock-AI engine reflects every user answer; one-function swap to wire real Claude API later.",
    features: ["State-machine quiz flow", "Personalised AI-style intro", "3–6 step routine generator", "Email capture (Google Sheets)", "Pure static SPA, ₹0 hosting"],
    liveUrl: "https://lume-glow-iq.vercel.app",
    githubUrl: "https://github.com/productivelakshay-commits/motion-studio-lume-glow-iq",
    status: "Live",
  },
  {
    id: 3,
    title: "Lume Skincare",
    tagline: "D2C Skincare Brand Landing",
    category: "E-Commerce",
    tags: ["React", "Vite", "Tailwind", "Motion"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    color: "#E8B8A0",
    gradient: "linear-gradient(135deg, #FBF5EE, #E8B8A0)",
    metric: "Live",
    metricLabel: "Landing Page",
    year: "2026",
    desc: "A warm, editorial landing page for a premium skincare brand — hero, featured products, ritual builder, testimonials, newsletter. Cream/peach palette and Cormorant serif typography.",
    features: ["Hero with parallax animations", "Featured products grid", "Routine builder section", "Newsletter capture", "Mobile-first responsive"],
    liveUrl: "https://lume-skincare-five.vercel.app",
    githubUrl: "https://github.com/productivelakshay-commits/motion-studio-lume-skincare",
    status: "Live",
  },
  {
    id: 4,
    title: "Premium Skincare",
    tagline: "Editorial Skincare Portfolio",
    category: "E-Commerce",
    tags: ["React", "Vite", "Tailwind", "Motion"],
    image: "https://images.unsplash.com/photo-1585945037805-5fd82c2e60b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    color: "#8B6F47",
    gradient: "linear-gradient(135deg, #D4B996, #8B6F47)",
    metric: "Live",
    metricLabel: "Portfolio",
    year: "2026",
    desc: "An editorial portfolio that turns skincare into a quiet luxury brand. Magazine-style typography, generous whitespace, photography-led product storytelling.",
    features: ["Magazine layout grid", "Smooth scroll animations", "Product detail reveals", "Testimonials carousel", "Premium typography"],
    liveUrl: "https://premium-skincare.vercel.app",
    githubUrl: "https://github.com/productivelakshay-commits/motion-studio-premium-skincare",
    status: "Live",
  },
  {
    id: 5,
    title: "Healthy Chef",
    tagline: "Food & Wellness Brand",
    category: "E-Commerce",
    tags: ["React", "Vite", "Tailwind", "Motion"],
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    color: "#84cc16",
    gradient: "linear-gradient(135deg, #bef264, #65a30d)",
    metric: "Live",
    metricLabel: "Brand Site",
    year: "2026",
    desc: "A wellness-forward brand site for a personal chef — six menu categories (breakfast through high-protein), signature picks, a luxe ordering CTA. Calm green-and-cream palette with Playfair serif headlines that signals nourishment.",
    features: ["6-category menu sections", "Hero with floating macro cards", "Signature picks grid", "Sticky category navigation", "Premium typography + leaf motifs"],
    liveUrl: "https://healthy-chef-spa.vercel.app",
    githubUrl: "https://github.com/productivelakshay-commits/motion-studio-healthy-chef",
    status: "Live",
  },
  {
    id: 6,
    title: "MC Pura",
    tagline: "Cinematic Luxury Portfolio",
    category: "Brand",
    tags: ["React", "Vite", "Tailwind", "Motion"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    color: "#a78bfa",
    gradient: "linear-gradient(135deg, #1e1b4b, #a78bfa)",
    metric: "Live",
    metricLabel: "Personal Brand",
    year: "2026",
    desc: "A cinematic, dark-mode personal brand portfolio. Heavy on hero motion, full-bleed imagery, and slow reveal scroll choreography — the kind of site that lingers in memory.",
    features: ["Full-bleed hero video feel", "Cinematic scroll reveals", "Dark luxury palette", "Custom cursor effects", "Premium animation rhythm"],
    liveUrl: "https://mc-pura.vercel.app",
    githubUrl: "https://github.com/productivelakshay-commits/motion-studio-mc-pura",
    status: "Live",
  },
];

const categories: Category[] = ["All", "AI Tools", "E-Commerce", "Brand"];

const categoryIcons: Record<Category, any> = {
  All: Sparkles,
  SaaS: Database,
  "AI Tools": Brain,
  Mobile: Smartphone,
  "E-Commerce": ShoppingCart,
  Brand: Zap,
};

/* ─── Floating Orb ───────────────────────────── */
function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(80px)", opacity: 0.3 }}
      animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.1, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Particle ───────────────────────────────── */
function Particle({ i }: { i: number }) {
  const x = `${Math.random() * 100}%`;
  const y = `${Math.random() * 100}%`;
  const size = Math.random() * 2.5 + 1;
  return (
    <motion.div
      className="absolute rounded-full bg-violet-400"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
    />
  );
}

/* ─── Status Badge ───────────────────────────── */
function StatusBadge({ status }: { status: Project["status"] }) {
  const config = {
    Live: { color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", dot: true },
    "Open Source": { color: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.3)", dot: false },
    "Case Study": { color: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)", dot: false },
  }[status];
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: config.bg, border: `1px solid ${config.border}` }}>
      {config.dot && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: config.color }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: config.color }}>{status}</span>
    </div>
  );
}

/* ─── Project Card ───────────────────────────── */
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const [hovered, setHovered] = useState(false);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 15;
    const y = -(e.clientX - rect.left - rect.width / 2) / 15;
    setRot({ x, y });
  };

  return (
    <AnimatedSection delay={index * 0.08} direction="up">
      <motion.div
        className="group relative rounded-2xl overflow-hidden border"
        style={{ transformStyle: "preserve-3d", borderColor: "rgba(255,255,255,0.1)" }}
        animate={{ rotateX: hovered ? rot.x : 0, rotateY: hovered ? rot.y : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setRot({ x: 0, y: 0 }); }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => onOpen(project)}>
          <motion.div
            className="w-full h-full"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageWithFallback src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/50 to-transparent" />
          <motion.div className="absolute inset-0" style={{ background: project.gradient }} animate={{ opacity: hovered ? 0.2 : 0 }} transition={{ duration: 0.3 }} />

          {/* Top row */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <StatusBadge status={project.status} />
            <span className="text-white/50" style={{ fontSize: "0.72rem", backgroundColor: "rgba(0,0,0,0.4)", padding: "2px 8px", borderRadius: 6 }}>{project.year}</span>
          </div>

          {/* Metric */}
          <motion.div
            className="absolute bottom-3 right-3 text-right"
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-white" style={{ fontSize: "1.4rem", fontWeight: 800, lineHeight: 1, textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>{project.metric}</div>
            <div className="text-white/60" style={{ fontSize: "0.7rem" }}>{project.metricLabel}</div>
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", fontSize: "0.88rem", fontWeight: 600 }}
              animate={{ scale: hovered ? 1 : 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <MonitorPlay size={15} /> View Details
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5" style={{ backgroundColor: "rgba(8,4,26,0.97)" }}>
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="text-white" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{project.title}</h3>
              <p className="text-white/40" style={{ fontSize: "0.78rem" }}>{project.tagline}</p>
            </div>
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: project.gradient }}
              animate={{ rotate: hovered ? 12 : 0, scale: hovered ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Zap size={15} className="text-white" />
            </motion.div>
          </div>

          <p className="text-white/50 mb-4" style={{ fontSize: "0.83rem", lineHeight: 1.65 }}>{project.desc.slice(0, 100)}…</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="px-2.5 py-1 rounded-full border"
                style={{ fontSize: "0.72rem", backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
                whileHover={{ borderColor: project.color, color: "rgba(255,255,255,1)", backgroundColor: `${project.color}22` }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {project.liveUrl ? (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-white"
                style={{ background: project.gradient, fontSize: "0.8rem", fontWeight: 600 }}
                whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${project.color}55` }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Globe size={13} /> Live Demo
              </motion.a>
            ) : (
              <motion.a
                href={whatsappUrl(`Hi Motion Studio team, I'd love a demo of ${project.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-white"
                style={{ background: "#25d366", fontSize: "0.8rem", fontWeight: 600 }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(37,211,102,0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle size={13} className="fill-white text-[#25d366]" /> Request Demo
              </motion.a>
            )}
            {project.githubUrl ? (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border"
                style={{ fontSize: "0.8rem", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0.04)" }}
                whileHover={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,1)", backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={13} /> Code
              </motion.a>
            ) : null}
            <motion.button
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border cursor-pointer"
              style={{ fontSize: "0.8rem", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0.04)" }}
              whileHover={{ borderColor: project.color, color: "rgba(255,255,255,1)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpen(project)}
            >
              <ExternalLink size={13} /> Details
            </motion.button>
          </div>
        </div>

        {/* Bottom glow bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: project.gradient }}
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />
      </motion.div>
    </AnimatedSection>
  );
}

/* ─── Project Modal ──────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  const stats = [
    { label: "Key Metric", value: project.metric },
    { label: project.metricLabel, value: "" },
    { label: "Year", value: project.year },
    { label: "Type", value: project.category },
  ].filter(s => s.value);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border"
        style={{ backgroundColor: "#08041a", borderColor: "rgba(255,255,255,0.1)" }}
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <ImageWithFallback src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08041a] via-[#08041a]/50 to-transparent" />
          <motion.div className="absolute inset-0" style={{ background: project.gradient, opacity: 0.18 }} />

          <motion.button
            className="absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-sm border flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,1)" }}
            onClick={onClose}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={16} />
          </motion.button>

          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <StatusBadge status={project.status} />
            <motion.span
              className="px-3 py-1 rounded-full text-white"
              style={{ background: project.gradient, fontSize: "0.75rem", fontWeight: 600 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.category}
            </motion.span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7">
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 }}>
            <h2 className="text-white mb-0.5" style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em" }}>{project.title}</h2>
            <p className="text-white/40 mb-5" style={{ fontSize: "0.85rem" }}>{project.tagline} · {project.year}</p>
          </motion.div>

          {/* Metric highlight */}
          <motion.div
            className="flex items-center gap-4 p-4 rounded-2xl mb-6"
            style={{ background: `linear-gradient(135deg, ${project.color}18, ${project.color}08)`, border: `1px solid ${project.color}30` }}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            <div>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: project.color, lineHeight: 1 }}>{project.metric}</div>
              <div className="text-white/50" style={{ fontSize: "0.8rem" }}>{project.metricLabel}</div>
            </div>
            <div className="h-10 w-px" style={{ backgroundColor: `${project.color}30` }} />
            <p className="text-white/60" style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{project.desc}</p>
          </motion.div>

          {/* Features */}
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 }}>
            <h3 className="text-white mb-3" style={{ fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {project.features.map((f, i) => (
                <motion.div
                  key={f}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.22 + i * 0.06, type: "spring" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
                  <span className="text-white/65" style={{ fontSize: "0.82rem" }}>{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech tags */}
          <motion.div className="flex flex-wrap gap-2 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1 rounded-full border"
                style={{ fontSize: "0.78rem", backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div className="flex flex-wrap gap-3" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.32 }}>
            {project.liveUrl ? (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white"
                style={{ background: project.gradient, fontSize: "0.92rem", fontWeight: 600 }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${project.color}55` }}
                whileTap={{ scale: 0.97 }}
              >
                <Globe size={15} /> Live Demo
              </motion.a>
            ) : (
              <motion.a
                href={whatsappUrl(`Hi Motion Studio team, I'd love a demo of ${project.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white"
                style={{ background: "#25d366", fontSize: "0.92rem", fontWeight: 600 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37,211,102,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={15} className="fill-white text-[#25d366]" /> Request Demo
              </motion.a>
            )}
            {project.githubUrl ? (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border"
                style={{ fontSize: "0.92rem", backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)" }}
                whileHover={{ scale: 1.05, color: "rgba(255,255,255,1)", borderColor: "rgba(255,255,255,0.35)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Github size={15} /> Source Code
              </motion.a>
            ) : null}
            <Link to="/contact">
              <motion.button
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white cursor-pointer"
                style={{ background: project.gradient, fontSize: "0.92rem", fontWeight: 600 }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${project.color}55` }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
              >
                Build Similar <ArrowRight size={15} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Process Step ───────────────────────────── */
function ProcessStep({ step, title, desc, delay }: { step: string; title: string; desc: string; delay: number }) {
  return (
    <AnimatedSection delay={delay} direction="up">
      <motion.div
        className="relative flex gap-6"
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-white" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{step}</span>
          </motion.div>
          <div className="w-px flex-1 mt-3" style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.4), transparent)", minHeight: 40 }} />
        </div>
        <div className="pb-8 pt-1">
          <h3 className="text-white mb-2" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{title}</h3>
          <p className="text-white/50" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</p>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

/* ─── Marquee ────────────────────────────────── */
const tools = ["React", "Next.js", "Motion", "TypeScript", "Tailwind CSS", "Figma", "Three.js", "GSAP", "Framer", "Vercel", "Shopify", "Supabase"];

function ToolStrip() {
  const doubled = [...tools, ...tools];
  return (
    <div className="overflow-hidden py-4 border-y border-white/5">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-2 text-white/35 shrink-0" style={{ fontSize: "0.85rem" }}>
            <Zap size={11} className="text-violet-500" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────── */
export function Work() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const springY = useSpring(heroY, { stiffness: 100, damping: 30 });

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#120428_0%,_#050510_60%)]" />
          <FloatingOrb x="5%" y="15%" size={350} color="radial-gradient(circle, #7c3aed, transparent)" delay={0} />
          <FloatingOrb x="75%" y="10%" size={280} color="radial-gradient(circle, #ec4899, transparent)" delay={1.5} />
          <FloatingOrb x="85%" y="60%" size={300} color="radial-gradient(circle, #06b6d4, transparent)" delay={3} />
          {Array.from({ length: 30 }).map((_, i) => <Particle key={i} i={i} />)}
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ y: springY, opacity: heroOpacity }}
        >
          {/* Label */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-violet-400"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-violet-300" style={{ fontSize: "0.85rem" }}>Selected Works · 2024–2025</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-5">
            <motion.h1
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Work That{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Converts
              </span>
            </motion.h1>
          </div>

          <motion.p
            className="text-white/50 max-w-xl mx-auto mb-10"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.75 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            A curated collection of projects built to captivate, engage, and drive real business results.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}>EXPLORE</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TOOL STRIP ── */}
      <ToolStrip />

      {/* ── FILTER + GRID ── */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0d0520_0%,_transparent_70%)]" />
        <div className="max-w-6xl mx-auto relative">

          {/* Filter Tabs */}
          <AnimatedSection className="flex flex-wrap gap-3 justify-center mb-14">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat];
              const isActive = activeFilter === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border cursor-pointer"
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 700 : 500,
                    borderColor: isActive ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.1)",
                    backgroundColor: isActive ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                    color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
                  }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.4)", color: "rgba(255,255,255,1)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Icon size={14} />
                  {cat}
                  {isActive && (
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-violet-400"
                      layoutId="filter-dot"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </AnimatedSection>

          {/* Count */}
          <motion.div
            className="text-center mb-10 text-white/30"
            key={activeFilter}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: "0.85rem" }}
          >
            Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="sync">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} index={i} onOpen={setSelectedProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── DESIGN LAB ── */}
      <LabGrid />

      {/* ── FEATURED BANNER ── */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection direction="scale">
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1621111848501-8d3634f82336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBwb3J0Zm9saW8lMjBjcmVhdGl2ZSUyMGRhcmslMjBVSXxlbnwxfHx8fDE3Nzg3NjcxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Featured project"
                loading="lazy"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050510] via-[#050510]/70 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-10 max-w-lg">
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <span className="text-violet-400 tracking-widest uppercase mb-3 block" style={{ fontSize: "0.75rem" }}>Featured Work</span>
                    <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                      Every Pixel Has a<br />
                      <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Purpose.</span>
                    </h2>
                    <p className="text-white/55 mb-6" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                      I don't just make things look good — I build experiences that move people to act.
                    </p>
                    <Link to="/contact">
                      <motion.button
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", fontSize: "0.92rem", fontWeight: 600 }}
                        whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(139,92,246,0.5)" }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Let's Build Yours <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <AnimatedSection>
                <span className="text-violet-400 tracking-widest uppercase mb-3 block" style={{ fontSize: "0.8rem" }}>How I Work</span>
                <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  My{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Process
                  </span>
                </h2>
                <p className="text-white/45 mb-10" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
                  A clear, collaborative workflow that keeps you in the loop and delivers results on time — every time.
                </p>
              </AnimatedSection>

              {/* Animated metric cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "React", label: "Modern Stack", color: "#7c3aed" },
                  { value: "Motion", label: "Animation-First", color: "#ec4899" },
                  { value: "∞", label: "Revisions", color: "#06b6d4" },
                  { value: "🇮🇳", label: "Delhi, India", color: "#10b981" },
                ].map((m, i) => (
                  <AnimatedSection key={m.label} delay={i * 0.1} direction="scale">
                    <motion.div
                      className="p-4 rounded-2xl border text-center"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                      whileHover={{ borderColor: m.color, y: -4 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div style={{ fontSize: "2rem", fontWeight: 800, color: m.color }}>{m.value}</div>
                      <div className="text-white/40" style={{ fontSize: "0.78rem", marginTop: 2 }}>{m.label}</div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <div>
              {[
                { step: "01", title: "Discovery Call", desc: "We align on goals, audience, and success metrics so every design decision has purpose." },
                { step: "02", title: "Design & Prototype", desc: "High-fidelity Figma prototypes with motion specs — you see it before a line of code is written." },
                { step: "03", title: "Build & Animate", desc: "Clean React + Tailwind code with Motion-powered animations that perform at 60fps." },
                { step: "04", title: "Launch & Hand-off", desc: "Full source code, deployment, and a short loom walkthrough so you own what we built." },
              ].map((p, i) => (
                <ProcessStep key={p.step} {...p} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="scale">
            <motion.div
              className="relative rounded-3xl overflow-hidden p-12 text-center"
              style={{ background: "linear-gradient(135deg, #1a0533, #0a0a2e, #0d1a3a)" }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
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
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-5xl mb-6 inline-block"
                >
                  🚀
                </motion.div>
                <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  Your Project Could Be <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Next.</span>
                </h2>
                <p className="text-white/50 mb-8 max-w-xl mx-auto" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                  Spots fill up fast. Let's start a conversation about what we can build together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <motion.button
                      className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-500/30 cursor-pointer"
                      style={{ fontSize: "1.05rem", fontWeight: 600 }}
                      whileHover={{ scale: 1.07, boxShadow: "0 0 60px rgba(139,92,246,0.6)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Start My Project <ArrowRight size={20} />
                    </motion.button>
                  </Link>
                  <motion.a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25d366] text-white shadow-xl shadow-[#25d366]/30 cursor-pointer"
                    style={{ fontSize: "1.05rem", fontWeight: 600 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37,211,102,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MessageCircle size={18} className="fill-white text-[#25d366]" />
                    WhatsApp
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

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
