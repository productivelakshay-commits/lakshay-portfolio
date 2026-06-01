import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Heart, Bell, Search, ChevronDown, Check, Plus, Star, Sun, Moon, Sparkles,
  Volume2, ArrowRight, Zap, Settings, Mail, Github, Globe, X, Palette,
} from "lucide-react";

type DemoMeta = { title: string; desc: string };

function DemoCard({ title, desc, accent, children }: { title: string; desc: string; accent: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="relative rounded-2xl border overflow-hidden h-72 flex flex-col"
      style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
      whileHover={{ y: -6, borderColor: accent }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="relative flex-1 flex items-center justify-center p-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 40%, ${accent}22, transparent 70%)` }} />
        <div className="relative z-10 flex items-center justify-center w-full">{children}</div>
      </div>
      <div className="px-5 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)" }}>
        <p className="text-white" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{title}</p>
        <p className="text-white/40" style={{ fontSize: "0.72rem", lineHeight: 1.4 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* 01 — Magnetic Button */
function MagneticButtonDemo() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      className="cursor-pointer"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.5);
        y.set((e.clientY - r.top - r.height / 2) * 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
    >
      <div className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
        Hover Me
      </div>
    </motion.div>
  );
}

/* 02 — Counter */
function CounterDemo() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let start = 0;
    const t = setInterval(() => {
      start += 3;
      if (start >= 2847) { setCount(2847); clearInterval(t); }
      else setCount(start);
    }, 16);
    return () => clearInterval(t);
  }, []);
  return (
    <div ref={ref} className="text-center">
      <div className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent" style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>
        {count.toLocaleString()}
      </div>
      <div className="text-white/50 mt-1" style={{ fontSize: "0.75rem" }}>Animated counter</div>
    </div>
  );
}

/* 03 — Text Reveal */
function TextRevealDemo() {
  const [key, setKey] = useState(0);
  const words = ["Beautiful", "Animated", "Web"];
  return (
    <div className="text-center cursor-pointer" onClick={() => setKey(k => k + 1)}>
      <div key={key} className="overflow-hidden">
        {words.map((w, i) => (
          <motion.span
            key={w + i}
            className="inline-block mr-2 text-white"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "1.5rem", fontWeight: 800 }}
          >
            {w}
          </motion.span>
        ))}
      </div>
      <p className="text-white/30 mt-2" style={{ fontSize: "0.7rem" }}>click to replay</p>
    </div>
  );
}

/* 04 — Card Flip 3D */
function CardFlipDemo() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative w-40 h-24 cursor-pointer" onClick={() => setFlipped(f => !f)} style={{ perspective: 1000 }}>
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 rounded-xl flex items-center justify-center text-white"
          style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)", backfaceVisibility: "hidden" }}>
          <span style={{ fontWeight: 600 }}>Front</span>
        </div>
        <div className="absolute inset-0 rounded-xl flex items-center justify-center text-white"
          style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <span style={{ fontWeight: 600 }}>Back</span>
        </div>
      </motion.div>
    </div>
  );
}

/* 05 — Theme Toggle */
function ToggleDemo() {
  const [dark, setDark] = useState(true);
  return (
    <motion.button
      onClick={() => setDark(d => !d)}
      className="relative w-20 h-10 rounded-full cursor-pointer flex items-center px-1"
      animate={{ backgroundColor: dark ? "#1e1b4b" : "#fcd34d" }}
    >
      <motion.div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        animate={{ x: dark ? 0 : 40, backgroundColor: dark ? "#7c3aed" : "#f59e0b" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {dark ? (
            <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Moon size={14} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Sun size={14} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

/* 06 — Progress Ring */
function ProgressRingDemo() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPct(p => p >= 87 ? 87 : p + 1), 22);
    return () => clearInterval(t);
  }, []);
  const r = 36, c = 2 * Math.PI * r;
  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
        <circle cx="44" cy="44" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="44" cy="44" r={r} stroke="url(#g1)" strokeWidth="6" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100}
        />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{pct}%</div>
    </div>
  );
}

/* 07 — Like Button */
function LikeButtonDemo() {
  const [liked, setLiked] = useState(false);
  return (
    <motion.button
      onClick={() => setLiked(l => !l)}
      className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
      style={{ background: liked ? "rgba(244,63,94,0.15)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      whileTap={{ scale: 0.85 }}
    >
      <motion.div animate={{ scale: liked ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.4 }}>
        <Heart size={26} className={liked ? "fill-rose-500 text-rose-500" : "text-white/60"} />
      </motion.div>
      {liked && (
        <>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-rose-400"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos((deg * Math.PI) / 180) * 30,
                y: Math.sin((deg * Math.PI) / 180) * 30,
                opacity: 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
}

/* 08 — Gradient Shimmer Text */
function ShimmerTextDemo() {
  return (
    <motion.div
      className="bg-clip-text text-transparent"
      style={{
        fontSize: "1.8rem",
        fontWeight: 800,
        backgroundImage: "linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b, #7c3aed)",
        backgroundSize: "300% 100%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      Shimmer Text
    </motion.div>
  );
}

/* 09 — Skeleton Loader */
function SkeletonDemo() {
  return (
    <div className="w-full space-y-2">
      {[80, 100, 60].map((w, i) => (
        <motion.div
          key={i}
          className="h-3 rounded-full"
          style={{ width: `${w}%`, background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.04) 100%)", backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
        />
      ))}
      <div className="flex items-center gap-2 mt-3">
        <motion.div
          className="w-8 h-8 rounded-full"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.04) 100%)", backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="h-3 rounded-full flex-1"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.04) 100%)", backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: 0.3 }}
        />
      </div>
    </div>
  );
}

/* 10 — Animated Tabs */
function TabsDemo() {
  const [active, setActive] = useState(0);
  const tabs = ["Home", "Work", "About"];
  return (
    <div className="flex gap-1 p-1 rounded-full border border-white/10 bg-white/5">
      {tabs.map((t, i) => (
        <button key={t} onClick={() => setActive(i)} className="relative px-4 py-1.5 rounded-full cursor-pointer" style={{ fontSize: "0.78rem" }}>
          {active === i && (
            <motion.div layoutId="lab-tab" className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          )}
          <span className="relative z-10 text-white">{t}</span>
        </button>
      ))}
    </div>
  );
}

/* 11 — Star Rating */
function RatingDemo() {
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= (hover || rating);
        return (
          <motion.button
            key={n}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            <Star size={22} className={filled ? "fill-yellow-400 text-yellow-400" : "text-white/20"} />
          </motion.button>
        );
      })}
    </div>
  );
}

/* 12 — Confetti Button */
function ConfettiButtonDemo() {
  const [bursts, setBursts] = useState(0);
  return (
    <div className="relative">
      <motion.button
        onClick={() => setBursts(b => b + 1)}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white cursor-pointer relative overflow-visible"
        style={{ fontSize: "0.9rem", fontWeight: 600 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
      >
        🎉 Celebrate
      </motion.button>
      <AnimatePresence>
        {Array.from({ length: bursts }).map((_, b) => (
          <div key={b} className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * Math.PI * 2;
              const colors = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"];
              return (
                <motion.span
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                  style={{ background: colors[i % colors.length] }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(angle) * 60, y: Math.sin(angle) * 60, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* 13 — Toast Notification */
function ToastDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-3">
      <motion.button
        onClick={() => { setShow(true); setTimeout(() => setShow(false), 2200); }}
        className="px-4 py-2 rounded-full border border-white/15 text-white cursor-pointer"
        style={{ fontSize: "0.82rem", background: "rgba(255,255,255,0.05)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Trigger Toast
      </motion.button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.9 }}
            className="absolute bottom-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200"
            style={{ fontSize: "0.75rem" }}
          >
            <Check size={14} className="text-emerald-300" />
            Saved successfully
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 14 — Expanding Search */
function SearchDemo() {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="flex items-center border rounded-full overflow-hidden"
      animate={{ width: open ? 200 : 44, borderColor: open ? "rgba(139,92,246,0.6)" : "rgba(255,255,255,0.15)" }}
      style={{ background: "rgba(255,255,255,0.04)" }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
    >
      <button onClick={() => setOpen(o => !o)} className="w-11 h-11 flex items-center justify-center text-white/70 cursor-pointer shrink-0">
        <Search size={16} />
      </button>
      <input
        placeholder="Search..."
        className="bg-transparent outline-none text-white pr-3 placeholder-white/30"
        style={{ fontSize: "0.85rem", width: open ? "auto" : 0 }}
      />
    </motion.div>
  );
}

/* 15 — Bar Chart */
function BarChartDemo() {
  const data = [42, 78, 55, 91, 64, 88];
  return (
    <div className="flex items-end gap-1.5 h-24">
      {data.map((v, i) => (
        <motion.div
          key={i}
          className="w-4 rounded-t"
          style={{ background: "linear-gradient(to top, #7c3aed, #ec4899)" }}
          initial={{ height: 0 }}
          animate={{ height: `${v}%` }}
          transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

/* 16 — Spinner Pack */
function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <motion.div
        className="w-7 h-7 rounded-full border-2 border-violet-500/30 border-t-violet-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-fuchsia-400"
            animate={{ y: [-3, 3, -3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <motion.div
        className="relative w-7 h-7"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
      </motion.div>
    </div>
  );
}

/* 17 — Color Swatches */
function ColorSwatchDemo() {
  const colors = ["#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#f43f5e"];
  const [selected, setSelected] = useState("#7c3aed");
  return (
    <div className="flex gap-2">
      {colors.map((c) => (
        <motion.button
          key={c}
          onClick={() => setSelected(c)}
          className="w-8 h-8 rounded-full cursor-pointer relative"
          style={{ background: c }}
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 0.9 }}
        >
          {selected === c && (
            <motion.span
              layoutId="lab-color-ring"
              className="absolute -inset-1 rounded-full border-2 border-white"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}

/* 18 — Dropdown */
function DropdownDemo() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState("Option 1");
  const opts = ["Option 1", "Option 2", "Option 3"];
  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between gap-3 w-44 px-4 py-2 rounded-xl border border-white/15 text-white cursor-pointer"
        style={{ fontSize: "0.85rem", background: "rgba(255,255,255,0.04)" }}
        whileHover={{ borderColor: "rgba(139,92,246,0.5)" }}
      >
        {sel}
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -8, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-white/15 bg-[#0d0820] overflow-hidden z-20"
          >
            {opts.map((o) => (
              <button
                key={o}
                onClick={() => { setSel(o); setOpen(false); }}
                className="block w-full text-left px-4 py-2 text-white/70 hover:bg-white/5 hover:text-white"
                style={{ fontSize: "0.82rem" }}
              >
                {o}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 19 — Speed Dial FAB */
function FabDemo() {
  const [open, setOpen] = useState(false);
  const items = [Mail, Github, Globe];
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <AnimatePresence>
        {open && items.map((Icon, i) => {
          const angle = -90 - (i + 1) * 35;
          const rad = (angle * Math.PI) / 180;
          return (
            <motion.button
              key={i}
              className="absolute w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center cursor-pointer"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: Math.cos(rad) * 44, y: Math.sin(rad) * 44, opacity: 1, scale: 1 }}
              exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 22, delay: i * 0.04 }}
            >
              <Icon size={14} className="text-white" />
            </motion.button>
          );
        })}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center cursor-pointer z-10 shadow-lg shadow-violet-500/40"
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: open ? 45 : 0 }}
      >
        <Plus size={20} className="text-white" />
      </motion.button>
    </div>
  );
}

/* 20 — Page Wipe */
function PageWipeDemo() {
  const [page, setPage] = useState(0);
  const pages = [
    { bg: "linear-gradient(135deg, #7c3aed, #ec4899)", label: "Page 1" },
    { bg: "linear-gradient(135deg, #06b6d4, #3b82f6)", label: "Page 2" },
    { bg: "linear-gradient(135deg, #f59e0b, #f43f5e)", label: "Page 3" },
  ];
  return (
    <div
      className="relative w-44 h-24 rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setPage(p => (p + 1) % pages.length)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(140% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center text-white"
          style={{ background: pages[page].bg, fontWeight: 700 }}
        >
          {pages[page].label}
        </motion.div>
      </AnimatePresence>
      <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white/80" style={{ fontSize: "0.65rem" }}>click to transition</p>
    </div>
  );
}

const demos: (DemoMeta & { accent: string; render: () => React.ReactNode })[] = [
  { title: "01 · Magnetic Button", desc: "Cursor-following button with spring physics", accent: "#7c3aed", render: () => <MagneticButtonDemo /> },
  { title: "02 · Animated Counter", desc: "Number ticks up to target on mount", accent: "#ec4899", render: () => <CounterDemo /> },
  { title: "03 · Text Reveal", desc: "Word-by-word staggered entrance", accent: "#06b6d4", render: () => <TextRevealDemo /> },
  { title: "04 · 3D Card Flip", desc: "Backface-hidden 3D rotation on click", accent: "#3b82f6", render: () => <CardFlipDemo /> },
  { title: "05 · Theme Toggle", desc: "Spring-animated dark/light switch", accent: "#f59e0b", render: () => <ToggleDemo /> },
  { title: "06 · Progress Ring", desc: "SVG circular progress with gradient stroke", accent: "#a855f7", render: () => <ProgressRingDemo /> },
  { title: "07 · Like Button", desc: "Heart fill with radial particle burst", accent: "#f43f5e", render: () => <LikeButtonDemo /> },
  { title: "08 · Gradient Shimmer", desc: "Continuously panning gradient on text", accent: "#7c3aed", render: () => <ShimmerTextDemo /> },
  { title: "09 · Skeleton Loader", desc: "Shimmering placeholder for loading states", accent: "#64748b", render: () => <SkeletonDemo /> },
  { title: "10 · Animated Tabs", desc: "Shared-layout pill that morphs between tabs", accent: "#ec4899", render: () => <TabsDemo /> },
  { title: "11 · Star Rating", desc: "Hover preview + click to set", accent: "#facc15", render: () => <RatingDemo /> },
  { title: "12 · Confetti Burst", desc: "Click triggers a radial particle explosion", accent: "#f59e0b", render: () => <ConfettiButtonDemo /> },
  { title: "13 · Toast Notification", desc: "Slide-up alert with auto-dismiss", accent: "#10b981", render: () => <ToastDemo /> },
  { title: "14 · Expanding Search", desc: "Icon expands into a full input on click", accent: "#06b6d4", render: () => <SearchDemo /> },
  { title: "15 · Bar Chart Reveal", desc: "Staggered bar heights with easing", accent: "#a855f7", render: () => <BarChartDemo /> },
  { title: "16 · Loader Pack", desc: "Three loader styles in one card", accent: "#7c3aed", render: () => <SpinnerDemo /> },
  { title: "17 · Color Picker", desc: "Shared-layout ring follows the selection", accent: "#ec4899", render: () => <ColorSwatchDemo /> },
  { title: "18 · Dropdown Menu", desc: "Scale-fade open with rotating chevron", accent: "#3b82f6", render: () => <DropdownDemo /> },
  { title: "19 · Speed Dial FAB", desc: "Plus button fans out radial actions", accent: "#7c3aed", render: () => <FabDemo /> },
  { title: "20 · Page Wipe", desc: "Circular clip-path page transition", accent: "#f43f5e", render: () => <PageWipeDemo /> },
];

export function LabGrid() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#0d0520_0%,_transparent_60%)]" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-14">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
          >
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-violet-300" style={{ fontSize: "0.82rem" }}>Design Lab</span>
          </motion.div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            20 Live <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Micro-Demos</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-white/50 max-w-2xl mx-auto mt-4"
            style={{ fontSize: "1rem", lineHeight: 1.7 }}
          >
            Self-contained concept pieces — each card is a real, working interaction built with React + Motion. Hover, click, scrub. Everything you see ships in real client projects.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {demos.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <DemoCard title={d.title} desc={d.desc} accent={d.accent}>
                {d.render()}
              </DemoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
