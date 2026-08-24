import { motion } from "framer-motion";
import { birthdayConfig } from "../config/birthdayConfig";

interface IntroProps {
  onStart: () => void;
}

export default function Intro({ onStart }: IntroProps) {
  return (
    <motion.section
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative ring */}
      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          border: "1px solid rgba(167,139,250,0.08)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,171,252,0.06) 0%, transparent 70%)",
          border: "1px solid rgba(240,171,252,0.06)",
        }}
        animate={{ scale: [1.06, 1, 1.06], opacity: [0.7, 0.3, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-purple-400 text-sm font-body tracking-[0.25em] uppercase mb-8"
        >
          ✦ &nbsp; A gift just for you &nbsp; ✦
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="font-display text-4xl md:text-5xl text-white leading-tight mb-4"
        >
          {birthdayConfig.intro.line1}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="font-body text-lg text-purple-200/70 mb-12"
        >
          {birthdayConfig.intro.line2}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(167,139,250,0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="relative px-8 py-3.5 rounded-full font-body text-base font-medium text-white cursor-pointer overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(168,85,247,0.6))",
            border: "1px solid rgba(167,139,250,0.4)",
          }}
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(240,171,252,0.2))",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <span className="relative z-10">{birthdayConfig.intro.buttonText}</span>
        </motion.button>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-400/40 text-xs font-body tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <div className="bounce">↓</div>
      </motion.div>
    </motion.section>
  );
}
