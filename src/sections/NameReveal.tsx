import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { birthdayConfig } from "../config/birthdayConfig";

interface NameRevealProps {
  onComplete: () => void;
}

export default function NameReveal({ onComplete }: NameRevealProps) {
  const [phase, setPhase] = useState(0);
  const name = birthdayConfig.name;

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const letters = name.split("");

  return (
    <motion.section
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-xl w-full">
        {/* Line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display italic text-2xl md:text-3xl text-purple-200/80 mb-6"
        >
          {birthdayConfig.nameReveal.line1}
        </motion.p>

        {/* Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-body text-base md:text-lg text-purple-300/60 mb-10 tracking-wide"
        >
          {birthdayConfig.nameReveal.line2}
        </motion.p>

        {/* Greeting + Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <p className="font-display text-xl text-purple-300/70 mb-2">
            {birthdayConfig.nameReveal.greeting}
          </p>

          {/* Animated name letters */}
          <div className="flex items-center justify-center gap-0 flex-wrap">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.7 }}
                animate={
                  phase >= 3
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 24, scale: 0.7 }
                }
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                }}
                className={`font-display font-bold gradient-text ${
                  letter === " " ? "mx-2" : ""
                }`}
                style={{ fontSize: "clamp(3rem, 10vw, 5.5rem)", lineHeight: 1.1 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}

            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + letters.length * 0.07 + 0.2, duration: 0.5, type: "spring" }}
              style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", marginLeft: "0.3rem" }}
            >
              {birthdayConfig.nameReveal.emoji}
            </motion.span>
          </div>
        </motion.div>

        {/* Continue button */}
        {phase >= 3 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + letters.length * 0.07 + 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(240,171,252,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onComplete}
            className="mt-10 px-7 py-3 rounded-full font-body text-sm text-purple-200 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(240,171,252,0.25)",
            }}
          >
            See what I made for you →
          </motion.button>
        )}
      </div>

      {/* Decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.07) 0%, transparent 70%)",
        }}
      />
    </motion.section>
  );
}
