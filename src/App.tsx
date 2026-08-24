import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import StarField from "./components/StarField";
import FloatingPetals from "./components/FloatingPetals";
import CursorGlow from "./components/CursorGlow";
import MusicPlayer from "./components/MusicPlayer";
import ProgressNav from "./components/ProgressNav";

// Sections
import Intro from "./sections/Intro";
import NameReveal from "./sections/NameReveal";
import MemoryTimeline from "./sections/MemoryTimeline";
import BirthdayLetter from "./sections/BirthdayLetter";
import Wishes from "./sections/Wishes";
import MiniGame from "./sections/MiniGame";
import FinalGift from "./sections/FinalGift";

// Admin panel
import AdminPanel from "./pages/AdminPanel";

type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const BG_OVERLAYS: string[] = [
  "rgba(90,20,130,0.12)",   // 0 Intro      — purple
  "rgba(120,30,160,0.10)",  // 1 Name       — violet
  "rgba(30,20,100,0.12)",   // 2 Archive    — indigo
  "rgba(80,20,120,0.12)",   // 3 Letter     — deep purple
  "rgba(20,50,100,0.10)",   // 4 Wishes     — blue-purple
  "rgba(60,50,10,0.10)",    // 5 Game       — warm gold
  "rgba(100,20,100,0.12)",  // 6 Gift       — magenta
];

function LoadingScreen({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#0a0812" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              className="text-5xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              🌸
            </motion.div>
            <div
              className="w-40 h-0.5 rounded-full overflow-hidden"
              style={{ background: "rgba(167,139,250,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #a78bfa, #f0abfc)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <p className="font-body text-xs text-purple-400/40 tracking-widest">
              Preparing something special…
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [stage, setStage] = useState<Stage>(0);
  const [bgColor, setBgColor] = useState(BG_OVERLAYS[0]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate short loading
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // Check URL hash for admin mode
  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#admin") setShowAdmin(true);
      else setShowAdmin(false);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  const advance = (next: Stage) => {
    setStage(next);
    setBgColor(BG_OVERLAYS[next]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const jumpTo = (i: number) => advance(i as Stage);

  if (showAdmin) {
    return (
      <AdminPanel
        onBack={() => {
          window.location.hash = "";
          setShowAdmin(false);
        }}
      />
    );
  }

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen done={loaded} />

      {/* Color ambient overlay that transitions */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-[1800ms] ease-in-out"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${bgColor} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* Main */}
      <div className="relative min-h-screen overflow-x-hidden" ref={scrollRef}>
        {/* Stars (z-index 0) */}
        <StarField />

        {/* Petals (z-index 1) */}
        <FloatingPetals />

        {/* Custom cursor */}
        <CursorGlow />

        {/* Music player */}
        <MusicPlayer />

        {/* Progress nav */}
        <ProgressNav current={stage} onJump={jumpTo} />

        {/* Admin link — subtle, bottom-left on intro */}
        <AnimatePresence>
          {stage === 0 && (
            <motion.button
              key="admin-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 4 }}
              onClick={() => {
                window.location.hash = "#admin";
                setShowAdmin(true);
              }}
              className="fixed bottom-5 left-5 z-[998] text-xs font-body cursor-pointer transition-colors"
              style={{ color: "rgba(167,139,250,0.2)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(167,139,250,0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(167,139,250,0.2)")
              }
              title="Open customization panel"
            >
              ⚙️ Customize
            </motion.button>
          )}
        </AnimatePresence>

        {/* Sections */}
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Intro onStart={() => advance(1)} />
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <NameReveal onComplete={() => advance(2)} />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="archive"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <MemoryTimeline onComplete={() => advance(3)} />
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <BirthdayLetter onComplete={() => advance(4)} />
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="wishes"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Wishes onComplete={() => advance(5)} />
            </motion.div>
          )}

          {stage === 5 && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <MiniGame onComplete={() => advance(6)} />
            </motion.div>
          )}

          {stage === 6 && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FinalGift />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
