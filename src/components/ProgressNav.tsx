import { motion } from "framer-motion";

const STEPS = [
  { icon: "✨", label: "Intro" },
  { icon: "🌷", label: "Name" },
  { icon: "📁", label: "Archive" },
  { icon: "💌", label: "Letter" },
  { icon: "🌟", label: "Wishes" },
  { icon: "🎮", label: "Game" },
  { icon: "🎁", label: "Gift" },
];

interface ProgressNavProps {
  current: number;
  onJump: (i: number) => void;
}

export default function ProgressNav({ current, onJump }: ProgressNavProps) {
  if (current === 0) return null; // hide on intro

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[999]"
    >
      <div
        className="glass flex items-center gap-1 px-3 py-2 rounded-full"
        style={{ border: "1px solid rgba(167,139,250,0.15)" }}
      >
        {STEPS.map((step, i) => (
          <motion.button
            key={i}
            onClick={() => onJump(i)}
            title={step.label}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-6 h-6 flex items-center justify-center rounded-full text-sm cursor-pointer transition-all"
            style={{
              background:
                i === current
                  ? "rgba(167,139,250,0.25)"
                  : i < current
                  ? "rgba(167,139,250,0.10)"
                  : "transparent",
              border:
                i === current
                  ? "1px solid rgba(167,139,250,0.5)"
                  : "1px solid transparent",
              filter: i > current ? "grayscale(1) opacity(0.35)" : "none",
            }}
          >
            <span style={{ fontSize: "12px" }}>{step.icon}</span>
            {i < current && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ background: "rgba(167,139,250,0.08)" }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
