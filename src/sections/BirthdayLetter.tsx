import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";

interface BirthdayLetterProps {
  onComplete: () => void;
}

export default function BirthdayLetter({ onComplete }: BirthdayLetterProps) {
  const { salutation, lines, sign } = birthdayConfig.letter;
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal lines progressively on scroll + fallback timer
  useEffect(() => {
    // Start by showing first line after short delay
    const initial = setTimeout(() => setVisibleCount(1), 800);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-idx") || "0", 10);
            setVisibleCount((prev) => Math.max(prev, idx + 1));
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = containerRef.current?.querySelectorAll("[data-idx]");
    targets?.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(initial);
      observer.disconnect();
    };
  }, []);

  const allVisible = visibleCount >= lines.length;

  return (
    <motion.section
      className="relative z-10 min-h-screen flex flex-col items-center justify-center py-24 px-6"
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
          className="text-center mb-16"
        >
          <p className="text-purple-400/60 font-body text-xs tracking-[0.3em] uppercase mb-3">
            💌 The Letter
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white">
            Written just for you
          </h2>
        </motion.div>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "rgba(20,10,40,0.7)",
            border: "1px solid rgba(167,139,250,0.15)",
          }}
        >
          {/* Decorative corners */}
          <div
            className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(240,171,252,0.06), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(167,139,250,0.06), transparent 70%)",
            }}
          />

          {/* Paper lines decoration */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(167,139,250,0.03) 31px, rgba(167,139,250,0.03) 32px)",
              backgroundPositionY: "64px",
            }}
          />

          {/* Salutation */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-script text-2xl md:text-3xl text-purple-300 mb-8 relative z-10"
          >
            {salutation}
          </motion.p>

          {/* Lines revealed on scroll */}
          <div ref={containerRef} className="flex flex-col gap-4 relative z-10">
            {lines.map((line, i) => (
              <div key={i} data-idx={i} style={{ minHeight: "1.8rem" }}>
                <motion.p
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={
                    visibleCount > i
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 18, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  className="font-display italic text-lg md:text-xl text-purple-100/90 leading-relaxed"
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={allVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="mt-10 pt-6 relative z-10"
            style={{ borderTop: "1px solid rgba(167,139,250,0.1)" }}
          >
            <p className="font-script text-lg text-purple-400/70 text-right">
              {sign}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: allVisible ? 0 : 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-6"
        >
          <p className="text-purple-400/30 text-xs font-body tracking-widest bounce">
            ↓ Scroll to reveal each line
          </p>
        </motion.div>

        {/* Continue */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: allVisible ? 1 : 0, y: allVisible ? 0 : 10 }}
          transition={{ delay: 0.6, duration: 0.8 }}
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
            See my wishes for you →
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
