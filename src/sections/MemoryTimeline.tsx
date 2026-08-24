import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";

interface MemoryTimelineProps {
  onComplete: () => void;
}

export default function MemoryTimeline({ onComplete }: MemoryTimelineProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const memories = birthdayConfig.memories;

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
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
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-purple-400/60 font-body text-xs tracking-[0.3em] uppercase mb-3">
            📁 OUR_ARCHIVE
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
            Our Little Archive
          </h2>
          <p className="font-body text-sm text-purple-200/50">
            Click to open each memory
          </p>
        </motion.div>

        {/* Memory cards */}
        <div className="flex flex-col gap-4">
          {memories.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              {/* Card header */}
              <motion.button
                onClick={() => toggle(m.id)}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                className="w-full text-left glass rounded-2xl p-5 cursor-pointer transition-all"
                style={{
                  background: openId === m.id
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(255,255,255,0.03)",
                  border: openId === m.id
                    ? "1px solid rgba(167,139,250,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-body text-xs text-purple-400/60 font-medium tracking-widest min-w-[28px]">
                    {m.id}
                  </span>
                  <div
                    className="w-px self-stretch"
                    style={{ background: "rgba(167,139,250,0.2)" }}
                  />
                  <span className="text-2xl">{m.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-base md:text-lg text-white">
                      {m.title}
                    </h3>
                  </div>
                  <motion.span
                    animate={{ rotate: openId === m.id ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-purple-400/50 text-lg font-thin"
                  >
                    ›
                  </motion.span>
                </div>
              </motion.button>

              {/* Expanded content */}
              <AnimatePresence>
                {openId === m.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`mt-2 rounded-2xl p-6 bg-gradient-to-br ${m.color}`}
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <p className="font-body text-purple-100/90 leading-relaxed text-sm md:text-base">
                        {m.story}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: memories.length * 0.12 + 0.5, duration: 0.7 }}
          className="text-center mt-14"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(167,139,250,0.2)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onComplete}
            className="px-7 py-3 rounded-full font-body text-sm text-purple-200 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(167,139,250,0.25)",
            }}
          >
            There's a letter waiting for you →
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
