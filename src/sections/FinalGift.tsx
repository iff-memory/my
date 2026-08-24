import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../config/birthdayConfig";

export default function FinalGift() {
  const [opened, setOpened] = useState(false);
  const { buttonText, finalHeading, finalMessage, sign, emoji } = birthdayConfig.finalGift;

  const fireConfetti = () => {
    const end = Date.now() + 3000;
    const colors = ["#c084fc", "#f0abfc", "#fda4af", "#fde68a", "#a78bfa", "#fff"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        gravity: 0.9,
        scalar: 1.1,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        gravity: 0.9,
        scalar: 1.1,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      scalar: 1.2,
    });
  };

  const handleOpen = () => {
    setOpened(true);
    setTimeout(fireConfetti, 300);
  };

  return (
    <motion.section
      className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: opened
            ? "radial-gradient(ellipse at 50% 50%, rgba(240,171,252,0.08) 0%, transparent 70%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.06) 0%, transparent 70%)",
          transition: "background 1s ease",
        }}
      />

      <div className="content-width w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-purple-400/60 font-body text-xs tracking-[0.3em] uppercase mb-3">
            🎁 The Finale
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white">
            One last thing…
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Gift box */}
              <motion.div
                className="text-[90px] mb-8 select-none"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              >
                🎁
              </motion.div>

              <motion.p
                className="font-body text-purple-200/60 text-sm mb-10 max-w-xs"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Something special is waiting inside…
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(240,171,252,0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpen}
                className="px-9 py-4 rounded-full font-body text-base font-medium text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, rgba(168,85,247,0.6), rgba(236,72,153,0.4))",
                  border: "1px solid rgba(240,171,252,0.3)",
                }}
              >
                {buttonText}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
              className="flex flex-col items-center"
            >
              {/* Opened gift */}
              <motion.div
                className="text-[80px] mb-6 select-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                💝
              </motion.div>

              {/* Final message card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-strong rounded-3xl p-8 md:p-12 max-w-lg relative overflow-hidden"
                style={{
                  background: "rgba(20,10,40,0.7)",
                  border: "1px solid rgba(240,171,252,0.2)",
                }}
              >
                {/* Glow overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(240,171,252,0.04), rgba(167,139,250,0.04))",
                  }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-display text-2xl text-white mb-2"
                >
                  {finalHeading}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="font-display font-bold gradient-text text-4xl md:text-5xl mb-6"
                >
                  {birthdayConfig.name} {emoji}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="font-display italic text-lg text-purple-100/80 leading-relaxed mb-8"
                >
                  {finalMessage}
                </motion.p>

                {/* Star divider */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="w-16 h-px mx-auto mb-6"
                  style={{ background: "rgba(167,139,250,0.3)" }}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="font-script text-base text-purple-400/70"
                >
                  {sign}
                </motion.p>
              </motion.div>

              {/* Floating hearts */}
              {["💜", "🌸", "✨", "💫", "🌷"].map((h, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl pointer-events-none select-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                    y: -120 - Math.random() * 80,
                    x: (Math.random() - 0.5) * 200,
                  }}
                  transition={{
                    delay: 0.5 + i * 0.2,
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3 + i * 0.5,
                  }}
                  style={{
                    left: `${40 + Math.random() * 20}%`,
                    bottom: "60%",
                  }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Made with love */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: opened ? 2 : 1, duration: 1 }}
          className="mt-16 font-body text-xs text-purple-400 tracking-widest"
        >
          Made with ❤️ + JavaScript
        </motion.p>
      </div>
    </motion.section>
  );
}
