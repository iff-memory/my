import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";

interface MiniGameProps {
  onComplete: () => void;
}

interface GameStar {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  collected: boolean;
}

const { starsToCollect, title, subtitle, revealMessage, secretText } = birthdayConfig.miniGame;

function randomPos() {
  return {
    x: 8 + Math.random() * 84,
    y: 10 + Math.random() * 80,
  };
}

export default function MiniGame({ onComplete }: MiniGameProps) {
  const [stars, setStars] = useState<GameStar[]>([]);
  const [collected, setCollected] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const arenaRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const spawnStar = useCallback(() => {
    const pos = randomPos();
    const star: GameStar = {
      id: nextId.current++,
      x: pos.x,
      y: pos.y,
      size: 28 + Math.random() * 18,
      rotation: Math.random() * 360,
      collected: false,
    };
    setStars((prev) => [...prev.filter((s) => !s.collected), star]);
  }, []);

  const startGame = () => {
    setStarted(true);
    setCollected(0);
    setStars([]);
    setRevealed(false);
    nextId.current = 0;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnStar(), i * 180);
    }
  };

  const collectStar = (id: number) => {
    setStars((prev) =>
      prev.map((s) => (s.id === id ? { ...s, collected: true } : s))
    );
    setCollected((prev) => {
      const next = prev + 1;
      if (next < starsToCollect) {
        setTimeout(() => spawnStar(), 500);
      } else {
        setTimeout(() => setRevealed(true), 600);
      }
      return next;
    });
  };

  return (
    <motion.section
      className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="content-width w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-purple-400/60 font-body text-xs tracking-[0.3em] uppercase mb-3">
            🎮 Mini Game
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-2">{title}</h2>
          <p className="font-body text-sm text-purple-200/50">{subtitle}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <div className="text-6xl mb-8 flex justify-center gap-3">
                {"⭐".repeat(starsToCollect).split("").map((s, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
              <p className="font-body text-purple-200/60 text-sm mb-8">
                Find and collect all {starsToCollect} stars to unlock the secret
              </p>
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(251,191,36,0.2)" }}
                whileTap={{ scale: 0.97 }}
                onClick={startGame}
                className="px-8 py-3.5 rounded-full font-body text-base font-medium text-amber-200 cursor-pointer"
                style={{
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.3)",
                }}
              >
                Start collecting ⭐
              </motion.button>
            </motion.div>
          ) : revealed ? (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-6 flex justify-center gap-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {"⭐".repeat(starsToCollect).split("").map((s, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-display text-xl text-amber-300 mb-4"
              >
                {revealMessage}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass-strong rounded-2xl p-6 mb-10 max-w-md mx-auto"
                style={{ border: "1px solid rgba(251,191,36,0.15)" }}
              >
                <p className="font-display italic text-lg text-purple-100/90 leading-relaxed">
                  "{secretText}"
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(167,139,250,0.2)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onComplete}
                className="px-7 py-3 rounded-full font-body text-sm text-purple-200 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(167,139,250,0.25)",
                }}
              >
                One last surprise →
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Progress */}
              <div className="mb-4 flex items-center justify-center gap-3">
                {Array.from({ length: starsToCollect }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={i < collected ? { scale: [1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="text-xl"
                    style={{ opacity: i < collected ? 1 : 0.2 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              <p className="text-center font-body text-xs text-purple-400/50 mb-4">
                {collected}/{starsToCollect} collected
              </p>

              {/* Game arena */}
              <div
                ref={arenaRef}
                className="relative glass rounded-3xl overflow-hidden"
                style={{
                  height: 380,
                  border: "1px solid rgba(167,139,250,0.12)",
                  background: "rgba(10,8,18,0.6)",
                }}
              >
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(167,139,250,0.04) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Stars */}
                <AnimatePresence>
                  {stars.map((star) =>
                    star.collected ? null : (
                      <motion.button
                        key={star.id}
                        initial={{ scale: 0, opacity: 0, rotate: star.rotation }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 250, damping: 15 }}
                        onClick={() => collectStar(star.id)}
                        className="game-star absolute cursor-pointer"
                        style={{
                          left: `${star.x}%`,
                          top: `${star.y}%`,
                          fontSize: star.size,
                          transform: "translate(-50%, -50%)",
                          background: "none",
                          border: "none",
                        }}
                        whileHover={{ scale: 1.35 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        ⭐
                      </motion.button>
                    )
                  )}
                </AnimatePresence>

                {/* Instructions */}
                {stars.filter((s) => !s.collected).length === 0 && !revealed && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-body text-purple-400/30 text-sm animate-pulse">
                      Stars spawning…
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
