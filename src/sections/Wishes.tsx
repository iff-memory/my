import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";

interface WishesProps {
  onComplete: () => void;
}

export default function Wishes({ onComplete }: WishesProps) {
  const wishes = birthdayConfig.wishes;

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
          className="text-center mb-14"
        >
          <p className="text-purple-400/60 font-body text-xs tracking-[0.3em] uppercase mb-3">
            🌷 Wishes
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
            Things I wish for you
          </h2>
          <p className="font-body text-sm text-purple-200/50">
            For this year and every year after
          </p>
        </motion.div>

        {/* Wishes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishes.map((wish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: i * 0.1 + 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { duration: 0.25 },
              }}
              className="glass rounded-2xl p-6 cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(167,139,250,0.1)",
              }}
            >
              <div className="flex items-start gap-4">
                <motion.span
                  className="text-3xl"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{
                    delay: i * 0.1 + 1,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                >
                  {wish.icon}
                </motion.span>
                <div>
                  <h3 className="font-display text-base text-purple-200 mb-1.5 font-semibold">
                    {wish.title}
                  </h3>
                  <p className="font-body text-sm text-purple-300/60 leading-relaxed">
                    {wish.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: wishes.length * 0.1 + 0.7 }}
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
            There's a little game waiting →
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
